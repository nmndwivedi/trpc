import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useAuth } from '../hooks/auth'
import Link from 'next/link'
import { classNames } from '../lib/common'

export function NavbarDropdown() {
    const { user, signOut } = useAuth()

    if (!user) return <></>

    return (
        <Menu as="div" className="relative inline-block text-left flex-none">
            <Menu.Button className="flex items-center gap-x-5 md:gap-x-8">
                <img className='h-11 w-11 cursor-pointer shadow-md rounded-full active:opacity-80' src={user.user_metadata?.avatar_url} />
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={classNames(
                                        'text-gray-400',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    {user.email}
                                </div>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="/dashboard"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Dashboard
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="/prompt-engineering"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Prompt Engineering
                                </Link>
                            )}
                        </Menu.Item>
                        <div>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={e => { signOut() }}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block w-full px-4 py-2 text-left text-sm'
                                        )}
                                    >
                                        Logout
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
