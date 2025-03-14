import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroSection from "@/components/hero";
import { statsData } from '@/data/landing'; 
import { Card, CardContent } from "@/components/ui/card";
import { featuresData } from "@/data/landing";
import { howItWorksData } from "@/data/landing";
import { testimonialsData } from "@/data/landing";
import Link from 'next/link';


export default function Home() {
  return ( 
    <div className="mt-40">
      <HeroSection/>
      <section className="py-20 bg-orange-60">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((statsData , index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">{statsData.value}</div>
                <div className="text-gray-600">{statsData.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
  <div className="container mx-auto px-4">
    <div className="text-center font-bold mb-12 text-3xl">
        <h2>Everything you need to know about finance</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
      {featuresData.map((feature, index) => (
        <Card key={index} className='p-6'>
          <CardContent className='space-y-4 pt-4'>
            <div className="text-orange-500 text-3xl">
              {feature.icon}
            </div>
            <h3 className='text-xl font-semibold'> {feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

<section className="py-20 bg-orange-50 mb-12">
  <div className="container mx-auto px-4">
    <div className="text-center font-bold mb-12 text-3xl">
        <h2>How it works</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3  gap-8 mb-10">
      {howItWorksData.map((step, index) => (
        <div key={index} className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">{step.icon}</div>
          <h3 className='text-xl font-semibold mb-4'>{step.title}</h3>
          <p className="text-gray-600">{step.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<section>
  <div className="container mx-auto px-4">
    <div className="text-center font-bold mb-12 text-3xl">
        <h2>What our users say</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
      {testimonialsData.map((testimonial, index) => (
        <Card key={index} className='p-6'>
          <CardContent className='pt-4'>
            <div>
              <Image 
                src={testimonial.image}
                alt={testimonial.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div >
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
              </div>
              <p className="text-gray-600">{testimonial.quote}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

<section className="py-20 bg-orange-400 mb-12">
  <div className="container mx-auto px-4 text-center">
    <div className=" font-bold mb-6 text-3xl">
        <h2>Ready to take control of our finances?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Join us like more 10000 people to manage your finance</p>
        <Link href="/dashboard">
              <Button size='lg'  className="bg-white text-orange-500 hover:bg-orange-50 animate-bounce">
                  Start Free Trial
              </Button>
        </Link>
    </div>
  </div>
</section>

    </div> 
  );
}
 