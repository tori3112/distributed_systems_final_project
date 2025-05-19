import React from 'react';
import { Blob } from 'react-interactive-blob'
import { CheckIcon } from '@heroicons/react/20/solid'

const tiers = [
  {
    "name": "The Enthusiast",
    "id": "tier-enthusiast",
    "href": "#",
    "priceMonthly": "€149",
    "description": "Catch your favorite local Leuven bands without the fuss. Perfect for regular concertgoers in the area.",
    "features": [
      "Tickets to 2 local Leuven concerts per month (subject to availability)",
      "Comfortable accommodation option suggestions in Leuven",
      "Early access to Leuven concert package announcements",
      "Standard support"
    ],
    "featured": false
  },
  {
    "name": "The Ultimate Fan",
    "id": "tier-ultimate-fan",
    "href": "#",
    "priceMonthly": "€299",
    "description": "Experience the biggest shows, near and far, with premium perks and dedicated support.",
    "features": [
      "Tickets to 4 concerts per month (flexible location, subject to availability)",
      "Choice of premium accommodation options",
      "Priority access to concert package pre-sales",
      "Dedicated support concierge",
      "Exclusive merchandise discounts",
      "Option for personalized concert recommendations"
    ],
    "featured": true
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <Blob height={500} radius={150} />
        <h2 className="text-base/7 font-semibold text-fuchsia-600">Available Packages</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
          Your Concert Package Pricing
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
        We believe seeing your favorite artists shouldn't empty your wallet. At TubbyPackages, we're committed to offering transparent and competitive pricing for our concert and accommodation packages.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured ? 'relative bg-gray-900 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
              tier.featured
                ? ''
                : tierIdx === 0
                  ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
                  : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
              'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
            )}
          >
            <h3
              id={tier.id}
              className={classNames(tier.featured ? 'text-fuchsia-400' : 'text-fuchsia-600', 'text-base/7 font-semibold')}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? 'text-white' : 'text-gray-900',
                  'text-5xl font-semibold tracking-tight',
                )}
              >
                {tier.priceMonthly}
              </span>
              <span className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base')}>/month</span>
            </p>
            <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7')}>
              {tier.description}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured ? 'text-gray-300' : 'text-gray-600',
                'mt-8 space-y-3 text-sm/6 sm:mt-10',
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={classNames(tier.featured ? 'text-fuchsia-400' : 'text-fuchsia-600', 'h-6 w-5 flex-none')}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={classNames(
                tier.featured
                  ? 'bg-fuchsia-500 text-white shadow-xs hover:bg-fuchsia-400 focus-visible:outline-fuchsia-500'
                  : 'text-fuchsia-600 ring-1 ring-fuchsia-200 ring-inset hover:ring-fuchsia-300 focus-visible:outline-fuchsia-600',
                'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
              )}
            >
              Get started today
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
