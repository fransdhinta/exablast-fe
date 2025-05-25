<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white shadow-sm">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <span class="text-2xl font-bold text-indigo-600">Exablast</span>
        </div>
        <div class="hidden md:flex space-x-8">
          <a @click.prevent="scrollToSection('features')" href="#features" class="text-gray-700 hover:text-indigo-600 transition cursor-pointer">Features</a>
          <a @click.prevent="scrollToSection('testimonials')" href="#testimonials" class="text-gray-700 hover:text-indigo-600 transition cursor-pointer">Testimonials</a>
          <a @click.prevent="scrollToSection('pricing')" href="#pricing" class="text-gray-700 hover:text-indigo-600 transition cursor-pointer">Pricing</a>
        </div>
        <div class="flex space-x-4">
          <NuxtLink to="/login" class="px-4 py-2 text-indigo-600 hover:text-indigo-800 transition">Login</NuxtLink>
          <NuxtLink to="/register" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">Register</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="py-40 px-6">
      <div class="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Unlock Your <span class="text-indigo-600">Full Potential</span> with Exablast
          </h1>
          <p class="text-xl text-gray-600 mb-8">
            The all-in-one platform that helps you streamline workflows, collaborate seamlessly, 
            and achieve remarkable results.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink to="/register" class="px-8 py-3 bg-indigo-600 text-white rounded-md text-center hover:bg-indigo-700 transition">
              Start for Free
            </NuxtLink>
            <a href="#features" class="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-md text-center hover:bg-indigo-50 transition">
              Learn More
            </a>
          </div>
        </div>
        <div class="flex justify-center">
          <img src="https://placehold.co/600x400/indigo/white?text=Exablast" alt="Exablast Platform" class="rounded-lg shadow-xl max-w-full h-auto" />
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="py-20 px-6 bg-gray-50">
      <div class="container mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Powerful Features for Modern Teams</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage projects, automate workflows, and drive results.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Intuitive Dashboard</h3>
            <p class="text-gray-600">Gain insights at a glance with our beautifully designed, customizable dashboard.</p>
          </div>
          <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Team Collaboration</h3>
            <p class="text-gray-600">Work together seamlessly with real-time updates and shared workspaces.</p>
          </div>
          <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Automation</h3>
            <p class="text-gray-600">Save time with intelligent automation tools that streamline repetitive tasks.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-20 px-6 bg-white">
      <div class="container mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted by thousands of professionals worldwide to boost productivity and streamline operations.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div class="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center mb-4">
              <svg class="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
            <blockquote class="text-gray-600 italic mb-4">
              "Exablast has transformed how our team collaborates. The intuitive interface and powerful automation tools have boosted our productivity by 30% in just three months."
            </blockquote>
            <div class="flex items-center mt-20">
              <div class="h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/assets/images/people/kiryu_kuli.jpeg" alt="Bonnie image"/>
              </div>
              <div class="ml-3">
                <p class="font-medium text-gray-900">Sarah Lee</p>
                <p class="text-gray-500 text-sm">Product Manager, TechCorp</p>
              </div>
            </div>
          </div>
          
          <!-- Testimonial 2 -->
          <div class="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center mb-4">
              <svg class="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
            <blockquote class="text-gray-600 italic mb-4">
              "As a startup founder, I need tools that scale with my business. Exablast offers enterprise-level features at a fraction of the cost. It's been a game-changer for us."
            </blockquote>
            <div class="flex items-center mt-20">
              <div class="h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/assets/images/people/kiryu_kuli.jpeg" alt="Bonnie image"/>
              </div>
              <div class="ml-3">
                <p class="font-medium text-gray-900">Marcus Chen</p>
                <p class="text-gray-500 text-sm">CEO, InnovateLabs</p>
              </div>
            </div>
          </div>
          
          <!-- Testimonial 3 -->
          <div class="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center mb-4">
              <svg class="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg class="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
            <blockquote class="text-gray-600 italic mb-4">
              "We evaluated over a dozen platforms before choosing Exablast. The customer support is exceptional, and their development roadmap aligns perfectly with our long-term goals."
            </blockquote>
            <div class="flex items-center mt-20">
              <div class="h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/assets/images/people/kiryu_kuli.jpeg" alt="Bonnie image"/>
              </div>
              <div class="ml-3">
                <p class="font-medium text-gray-900">Amara Williams</p>
                <p class="text-gray-500 text-sm">CTO, GlobalSoft</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Pricing Section -->
    <section id="pricing" class="py-20 px-6 bg-gray-50">
      <div class="container mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Starter Plan -->
          <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200">
            <div class="text-center pb-8 border-b border-gray-100">
              <h3 class="text-xl font-bold text-gray-900 mb-2">Starter</h3>
              <p class="text-gray-500 mb-4">For individuals and small teams</p>
              <p class="text-4xl font-bold text-gray-900">$9<span class="text-lg text-gray-500 font-normal">/month</span></p>
            </div>
            <ul class="mt-8 space-y-4">
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-600">Up to 3 team members</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-600">5 projects</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-600">Basic analytics</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-600">24/7 email support</span>
              </li>
            </ul>
            <div class="mt-8">
              <NuxtLink to="/register" class="block w-full py-2 px-4 bg-indigo-100 text-indigo-600 text-center rounded-md hover:bg-indigo-200 transition">
                Start Free Trial
              </NuxtLink>
            </div>
          </div>
          
          <!-- Pro Plan (Featured) -->
          <div class="bg-white p-8 rounded-xl shadow-lg border-2 border-indigo-600 transform scale-105 md:-translate-y-4">
            <div class="absolute -top-4 left-0 right-0 flex justify-center">
              <span class="bg-indigo-600 text-white text-sm px-4 py-1 rounded-full">Most Popular</span>
            </div>
            <div class="text-center pb-8 border-b border-gray-100">
              <h3 class="text-xl font-bold text-gray-900 mb-2">Professional</h3>
              <p class="text-gray-500 mb-4">For growing businesses</p>
              <p class="text-4xl font-bold text-gray-900">$29<span class="text-lg text-gray-500 font-normal">/month</span></p>
            </div>
            <ul class="mt-8 space-y-4">
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-600">Up to 15 team members</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-600">Unlimited projects</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-600">Advanced analytics</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-600">Priority support</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-600">Custom integrations</span>
              </li>
            </ul>
            <div class="mt-8">
              <NuxtLink to="/register" class="block w-full py-2 px-4 bg-indigo-600 text-white text-center rounded-md hover:bg-indigo-700 transition">
                Start Free Trial
              </NuxtLink>
            </div>
          </div>
          
          <!-- Enterprise Plan -->
          <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200">
            <div class="text-center pb-8 border-b border-gray-100">
              <h3 class="text-xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <p class="text-gray-500 mb-4">For large organizations</p>
              <p class="text-4xl font-bold text-gray-900">$99<span class="text-lg text-gray-500 font-normal">/month</span></p>
            </div>
            <ul class="mt-8 space-y-4">
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-600">Unlimited team members</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-600">Unlimited everything</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-600">Advanced security</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-600">Dedicated account manager</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-600">On-premises deployment option</span>
              </li>
            </ul>
            <div class="mt-8">
              <NuxtLink to="/contact" class="block w-full py-2 px-4 bg-gray-800 text-white text-center rounded-md hover:bg-gray-900 transition">
                Contact Sales
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 px-6 bg-indigo-600">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold text-white mb-6">Ready to supercharge your productivity?</h2>
        <p class="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied users who have transformed their workflow with Exablast.
        </p>
        <NuxtLink to="/register" class="px-8 py-3 bg-white text-indigo-600 font-medium rounded-md inline-block hover:bg-indigo-50 transition">
          Get Started Today
        </NuxtLink>
      </div>
    </section>

    <!-- Back to Top Button (FAB) -->
    <button 
      @click="scrollToTop" 
      class="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50"
      :class="{ 'opacity-0 invisible': !showBackToTop, 'opacity-100 visible': showBackToTop }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
      </svg>
    </button>

    <!-- Footer -->
    <footer class="py-12 px-6 bg-gray-900">
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-6 md:mb-0">
            <span class="text-2xl font-bold text-white">Exablast</span>
            <p class="text-gray-400 mt-2">© {{ new Date().getFullYear() }} Exablast. All rights reserved.</p>
          </div>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-white transition">Terms</a>
            <a href="#" class="text-gray-400 hover:text-white transition">Privacy</a>
            <a href="#" class="text-gray-400 hover:text-white transition">Support</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    // Get the navbar height to offset the scroll position
    const navbar = document.querySelector('nav');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    // Calculate the position to scroll to
    const y = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    
    // Scroll smoothly to the section
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
}

// For back to top functionality
const showBackToTop = ref(false);

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Show/hide back to top button based on scroll position
const checkScroll = () => {
  // Show button when scrolled down 500px
  showBackToTop.value = window.pageYOffset > 500;
}

// Set up and clean up scroll event listener
onMounted(() => {
  window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>