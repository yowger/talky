import AvatarWithStatus from "@/components/common/avatar-with-status"
import { useState } from "react"

const users = [
    {
        id: 1,
        name: "Alice",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        id: 2,
        name: "Bob",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        id: 3,
        name: "Charlie",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
        id: 4,
        name: "Diana",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
]

export default function PeopleList() {
    const [people, setPeople] = useState(users)

    return (
        <div className="flex flex-col p-2">
            {people.map((person) => {
                const { avatar, name } = person

                return (
                    <div
                        key={person.id}
                        className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <AvatarWithStatus
                            name={name}
                            src={avatar}
                            isOnline={true}
                        />

                        <span className="ms-3 font-semibold text-gray-800 dark:text-white">
                            {person.name}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
