"use client";
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { categoryColors } from '@/data/categories';
import { format } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, MoreHorizontal, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

const RECURRING_INTERVALS = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
};

const TransactionTable = ({ transactions }) => {
    const router = useRouter();
    const [selectedIds, setSelectedIds] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        field: "date",
        direction: "desc",
    });

    const handleSort = (field) => {
        setSortConfig((current) => ({
            field,
            direction: current.field === field && current.direction === "asc" ? "desc" : "asc",
        }));
    };

    const sortedTransactions = React.useMemo(() => {
        if (!sortConfig.field) return transactions;

        return [...transactions].sort((a, b) => {
            if (a[sortConfig.field] < b[sortConfig.field]) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[sortConfig.field] > b[sortConfig.field]) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        });
    }, [transactions, sortConfig]);

    const handleSelect = (id) => {
        setSelectedIds((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedIds.length === transactions.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(transactions.map((transaction) => transaction.id));
        }
    };

    const deletefn = (ids) => {
        // Implement your delete logic here
        console.log("Deleting transactions with IDs:", ids);
    };

    if (!transactions || transactions.length === 0) {
        return <div className="text-center text-muted-foreground">No transactions available.</div>;
    }

    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <Table aria-label="Transaction Table">
                    <TableHeader>
                        <TableRow role="rowheader">
                            <TableHead className="w-[50px]">
                                <Checkbox
                                    checked={selectedIds.length === transactions.length && transactions.length > 0}
                                    onCheckedChange={handleSelectAll}
                                />
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                                <div className="flex items-center">
                                    Date
                                    {sortConfig.field === "date" &&
                                        (sortConfig.direction === "asc" ? (
                                            <ChevronUp className="ml-1 h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="ml-1 h-4 w-4" />
                                        ))}
                                </div>
                            </TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
                                <div className="flex items-center">
                                    Category
                                    {sortConfig.field === "category" && (
                                        <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
                                    )}
                                </div>
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("amount")}>
                                <div className="flex items-center justify-end">
                                    Amount
                                    {sortConfig.field === "amount" && (
                                        <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
                                    )}
                                </div>
                            </TableHead>
                            <TableHead>Recurring</TableHead>
                            <TableHead className="w-[50px]" />
                        </TableRow>
                    </TableHeader>
                    <TableBody role="rowgroup">
                        {sortedTransactions.map((transaction) => (
                            <TableRow key={transaction.id} className="hover-effect">
                                <TableCell>
                                    <Checkbox
                                        checked={selectedIds.includes(transaction.id)}
                                        onCheckedChange={() => handleSelect(transaction.id)}
                                    />
                                </TableCell>
                                <TableCell>{format(new Date(transaction.date), "PP")}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell className="capitalize">
                                    <span
                                        style={{
                                            background: categoryColors[transaction.category],
                                        }}
                                        className="px-2 py-1 rounded text-white text-small"
                                    >
                                        {transaction.category}
                                    </span>
                                </TableCell>
                                <TableCell
                                    className="text-right font-medium"
                                    style={{
                                        color: transaction.type === "Expense" ? "red" : "green",
                                    }}
                                >
                                    {transaction.type === 'Expense' ? '-' : '+'}$
                                    {transaction.amount.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    {transaction.isRecurring ? (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Badge variant="outline" className="gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200">
                                                        <RefreshCw className="h-3 w-3" />
                                                        {RECURRING_INTERVALS[transaction.recurringInterval]}
                                                    </Badge>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <div className="text-sm">
                                                        <div className="font-medium">Next Date:</div>
                                                        <div>{format(new Date(transaction.nextRecurringDate), "PP")}</div>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ) : (
                                        <Badge variant="outline" className="gap-1">
                                            <Clock className="h-3 w-3" />
                                            One-time
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel
                                                onClick={() =>
                                                    router.push(`/transaction/create?edit=${transaction.id}`)
                                                }
                                            >
                                                Edit
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="text-destructive"
                                                onClick={() => deletefn([transaction.id])}
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default TransactionTable;