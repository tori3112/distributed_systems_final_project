import React from 'react';

const people = [
    {
    name: 'Belgin Avyat',
    role: 'Co-Founder / CEO',
    imageUrl:
        'https://media.licdn.com/dms/image/v2/D4E03AQG5iXf5whdeaw/profile-displayphoto-shrink_200_200/B4EZdG5ciFH0AY-/0/1749241154679?e=1754524800&v=beta&t=l9cvPtnSqS1pfZCT-RnI0pmhNIGBmj-1FgMH-Ejj6sE',
    },
    {
    name: 'Nadia Putri',
    role: 'Co-Founder / CEO',
    imageUrl:
        'https://media.licdn.com/dms/image/v2/D4E35AQFVTWX-UJBFZw/profile-framedphoto-shrink_200_200/B4EZVdwldsHcAY-/0/1741034772718?e=1749888000&v=beta&t=OyCUa1wFbygDczC7GO-5mohNiUN9bVikp3aDEJLMIA8',
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
        <div className="bg-white py-24 sm:py-32">
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
                    <p className="text-sm/6 font-semibold text-indigo-600">{person.role}</p>
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