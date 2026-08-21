import CreditsCard from "./CreditsCard";

interface CastMember {
    original_name: string;
    known_for_department: string;
    profile_path: string;
    popularity: number;
}

interface CrewMember {
    original_name: string;
    known_for_department: string;
    department?: string;
    job?: string;
    profile_path: string;
    popularity: number;
}

interface CreditsSectionProps {
    cast: CastMember[];
    crew: CrewMember[];
}

export default function CreditsSection({ cast, crew }: CreditsSectionProps) {
    const castPersons = [...cast].sort((a, b) => b.popularity - a.popularity).slice(0, 5);
    const sortedCrew = [...crew].sort((a, b) => b.popularity - a.popularity);
    const crewDepartments = ["Production", "Directing", "Sound", "Writing", "Visual Effects"];
    let crewPersons: Array<{ original_name: string; profile_path: string; role: string }> = [];

    for (let i = 0; i < crewDepartments.length; i++) {
        let person = sortedCrew.find((a) => a.department === crewDepartments[i] || a.known_for_department === crewDepartments[i]);
        if (person) {
            crewPersons.push({
                original_name: person.original_name,
                profile_path: person.profile_path,
                role: person.job || person.known_for_department
            });
        }
    }


    return (
        <div className="mt-5">
            {castPersons.length>0 && <>
                <h4 className="font-semibold">Top Actors</h4>
                <div className="flex gap-5 py-3 w-full overflow-scroll hide-scrollbar">
                    {
                        castPersons.map((person) => (
                            <CreditsCard
                                key={person.original_name}
                                name={person.original_name}
                                role="Actor"
                                profilePath={person.profile_path} />
                        ))
                    }
                </div>
            </>
            }

            {
                crewPersons.length > 0 && <>
                    <h4 className="font-semibold">Crew Members</h4>
                    <div className="flex gap-5 py-3 w-full overflow-scroll hide-scrollbar">
                        {
                            crewPersons.map((person) => (
                                <CreditsCard
                                    key={person.original_name}
                                    name={person.original_name}
                                    role={person.role}
                                    profilePath={person.profile_path} />
                            ))
                        }
                    </div>
                </>
            }

        </div>
    )
}