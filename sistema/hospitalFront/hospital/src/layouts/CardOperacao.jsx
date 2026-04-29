
'use client';
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import Link from "next/link";

export default function CardOperacao({ operacoes }) {

    return(
      
      <div className="flex  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {operacoes.map((item, index) => (
                <Link key={index} href={item.href} className="group">
                  <div
                    className={`h-full p-6 bg-white rounded-2xl shadow-sm border-b-4 ${item.color} 
                    transition-all duration-300 hover:-translate-y-2 hover:shadow-xl active:scale-95 w-50`}
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">
                      {item.title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                    
                    <div className="mt-4 flex items-center text-blue-600 font-semibold text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      Acessar agora →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
    )

}