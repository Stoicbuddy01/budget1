import { useState } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(false);  // Fix: Default should be `false`
    const [error, setError] = useState(null);

    const fn = async (...args) => {
        setLoading(true);
        setError(null);

        try {
            const response = await cb(...args);  // ✅ Corrected: Call `cb` inside `try`
            setData(response);  // ✅ Store the response in `data`
        } catch (error) {
            setError(error);
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);  // ✅ Always stop loading after try/catch
        }
    };

    return { data, loading, error, fn, setData };
};

export default useFetch;
