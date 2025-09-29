import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div className="bg-white">
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold">F</span></div>
              <span className="font-semibold text-xl text-gray-900">FinTrack</span>
          </Link>
        </div>
        <div className="flex lg:flex-1 lg:justify-end space-x-4">
          <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></Link>
          <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">Sign Up</Link>
        </div>
      </nav>
    </header>
    <main className="relative isolate px-6 pt-14 lg:px-8">
       <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80caff] to-[#4f46e5] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Smart Finance Management with <span className="text-blue-600">FinTrack</span></h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">Your AI-powered personal finance assistant to track expenses, manage budgets, and gain valuable financial insights.</p>
        <div className="mt-10">
          <Link to="/signup" className="rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">Get started for free</Link>
        </div>
      </div>
    </main>
  </div>
);

export default LandingPage;
