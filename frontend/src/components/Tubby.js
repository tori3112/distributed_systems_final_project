import React from 'react';

const people = [
    {
    name: 'Belgin Avyat',
    role: 'Co-Founder / CEO',
    imageUrl:
        'https://media.licdn.com/dms/image/v2/D4E03AQHxG77eOxSNlA/profile-displayphoto-shrink_100_100/B4EZdfsRJQHcAU-/0/1749657130633?e=1755129600&v=beta&t=HGQV8Ns70x3q1O1CWknARTfycckKqcdWAFwzPoca3c8',
    },
    {
    name: 'Nadia Putri',
    role: 'Co-Founder / CEO',
    imageUrl:
        'https://media.licdn.com/dms/image/v2/D4E35AQHw2ic0jTLv7Q/profile-framedphoto-shrink_100_100/B4EZdKeoRHH0Ao-/0/1749301232985?e=1750424400&v=beta&t=9em4T8Fw6RfCsXrMfoIkXyqznYvhOvwm33fGI6cMXJA',
    },
    {
    name: 'Li Yixuan',
    role: 'Co-Founder / CEO',
    imageUrl:
        'https://i.postimg.cc/hjNhKQW6/377135225-274043032213971-258347705126224874-n.jpg',
    },
    {
    name: 'Wiktoria Radecka',
    role: 'Co-Founder / CEO',
    imageUrl:
        'https://media.licdn.com/dms/image/v2/D5603AQGi8Gh6eccF0w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1692114408241?e=1753920000&v=beta&t=XknoHdjH6mGcJl-FKOmH08Lj_60ePKjzCho8RHTgIrw',
    }
  ]

const Tubby = () => {
    return (
        <div className="relative isolate px-6 pt-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
                Meet our leadership
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
                We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
                best results for our clients.
            </p>
            </div>
            <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {people.map((person) => (
                <li key={person.name}>
                <div className="flex items-center gap-x-6">
                    <img alt="" src={person.imageUrl} className="size-16 rounded-full" />
                    <div>
                    <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">{person.name}</h3>
                    <p className="text-sm/6 font-semibold text-fuchsia-600">{person.role}</p>
                    </div>
                </div>
                </li>
            ))}
            </ul>
        </div>
        </div>
        );
    };

export default Tubby;