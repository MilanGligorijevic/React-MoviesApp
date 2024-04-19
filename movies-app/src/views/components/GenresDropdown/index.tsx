import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useMoviesGenres } from '../../../context/genreContext'
import { Link } from 'react-router-dom'
import { smallMobileScreen, smallerTabletScreen } from '../../../utilities/screenSizes'
import { useMediaQuery } from '@mui/material'

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

interface GenresDropdownProps {
    toggleFunction?: Function
}

export default function GenresDropdown({ toggleFunction }: GenresDropdownProps) {
    const genres = useMoviesGenres();

    const isSmallMobile = useMediaQuery(
        `(max-width: ${smallMobileScreen}px)`,
    );
    const isSmallerTablet = useMediaQuery(
        `(max-width: ${smallerTabletScreen}px)`,
    );

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded  px-1 py-1 sm:justify-start">
                    Movies by Genre
                    <ChevronDownIcon className=" h-5 w-5  self-center" aria-hidden="true" />
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
                {isSmallMobile || isSmallerTablet ?
                    <div className="py-1 px-1 text-sm grid grid-cols-2 gap-x-2 gap-y-2 underline">
                        {
                            genres.map((genre) => {
                                return (
                                    <Link
                                        to={`/genreMovies/${genre.id}/${genre.name}`}
                                        key={genre.id}
                                        onClick={() => toggleFunction && toggleFunction()}
                                        className='s:text-center'
                                    >
                                        {genre.name}
                                    </Link>
                                )
                            })
                        }
                    </div>
                    :
                    <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {
                                genres.map((genre) => {
                                    return (
                                        <Menu.Item key={genre.id}>
                                            {({ active }) => (
                                                <Link
                                                    to={`/genreMovies/${genre.id}/${genre.name}`}
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
                }
            </Transition>
        </Menu>
    )
}