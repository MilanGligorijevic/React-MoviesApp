import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
import { smallMobileScreen, smallerTabletScreen } from '../../../utilities/screenSizes'

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

interface TrendingDropdownProps {
    toggleFunction?: Function;
}

export default function TrendingDropdown({ toggleFunction }: TrendingDropdownProps) {
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
                    Trending
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
                    <div className="py-1 px-1 text-base flex gap-5 underline s:justify-center">
                        <Link
                            to={`/trendingmovies`}
                            onClick={() => toggleFunction && toggleFunction()}
                        >
                            Movies
                        </Link>
                        <Link
                            to={`/trendingshows`}
                            onClick={() => toggleFunction && toggleFunction()}
                        >
                            Shows
                        </Link>
                    </div>
                    :
                    <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        to="/trendingmovies"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Movies
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        to="/trendingshows"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Shows
                                    </Link>
                                )}
                            </Menu.Item>

                        </div>
                    </Menu.Items>
                }
            </Transition>
        </Menu>
    )
}