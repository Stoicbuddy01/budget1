"use client";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { useRef, useEffect } from 'react'; 

const HeroSection = () => {
    
    const imageRef= useRef()

    useEffect (()=>{
        const imageElement = imageRef.current;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshhold=100;

            if(scrollPosition>scrollThreshhold){
                imageElement.classList.add("scrolled");
            }
            else{
                imageElement.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll",handleScroll);
        return () => window.removeEventListener("scroll",handleScroll);
    },[])
    
    return (
        <div className="pd-20 px-4">
          <div className='container mx-auto text-center'>
            <h1 className='text-5xl md:text-8xl lg:text-[105px] pb-6 gradient gradient-title'>Manage your finances <br /> with Intelligence</h1>
            <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>A AI powered finance platform helping you to 
               track down your financial status
            </p>
            <div className='justify-cener space-x-4'>
                <Link href="/dashboard">
                    <Button size='lg'  className="px-8">
                        Get Started
                    </Button>
                </Link>
                <Link href="https://youtube.com/shorts/L5iLdGgZAkg?si=WN4V7icbwHctUlHs">
                    <Button size='lg' variant="outline" className="px-8">
                        Watch demo
                    </Button>
                </Link>
            </div>
            <div className='hero-image-wrapper'>
                <div ref={imageRef} className='hero-image custom-image-wrapper'>
                <Image 
                src='/banner.jpeg'
                layout='intrinsic' 
                width={1280} 
                height={0}  
                alt='Dashboard Preview'
                className='rounded-2xl shadow-2xl border mx-auto'
                priority
                />
                </div>
            </div>
          </div>
        </div>
      );
}      
export default  HeroSection ;