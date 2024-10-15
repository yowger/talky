import AvatarWithStatus from "@/components/common/avatar-with-status"

import type { User } from "@/features/chat/types"

interface PeopleListProps {
    people: User[]
    onClick: (person: User) => void
}

export default function PeopleList({ people, onClick }: PeopleListProps) {
    return (
        <div className="flex flex-col">
            {people.map((person) => (
                <div
                    key={person.id}
                    className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => onClick(person)}
                >
                    <AvatarWithStatus
                        name={person.username}
                        src={person.imageUrl}
                        isOnline={true}
                    />

                    <span className="ms-3 font-semibold text-gray-800 dark:text-white">
                        {person.username}
                    </span>
                </div>
            ))}
        </div>
    )
}
