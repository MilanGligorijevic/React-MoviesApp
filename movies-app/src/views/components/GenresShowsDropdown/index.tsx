import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useShowsGenres } from '../../../context/genreShowsContext'
import { Link } from 'react-router-dom'

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function GenresShowsDropdown() {
    const genres = useShowsGenres();
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded  px-1 py-1 ">
                    Shows by Genre
                    <ChevronDownIcon className=" h-5 w-5 self-center" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {
                            genres.map((genre) => {
                                return (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                to={`/genreShows/${genre.id}/${genre.name}`}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                {genre.name}
                                            </Link>
                                        )}
                                    </Menu.Item>
                                )
                            })
                        }
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}