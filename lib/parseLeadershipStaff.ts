export interface Person {
  name: string;
  image: string;
  description: string;
}

export interface LeadershipStaffGroups {
  elders: Person[];
  deacons: Person[];
  staff: Person[];
}

function parseGroup(section: string): Person[] {
  // Matches: - name: ...\n  image: ...\n  description: ...
  const regex = /- name:\s*(.+)\n\s*image:\s*(.+)\n\s*description:\s*(.+)/g;
  const people: Person[] = [];
  let match;
  while ((match = regex.exec(section)) !== null) {
    people.push({
      name: match[1].trim(),
      image: match[2].trim(),
      description: match[3].trim(),
    });
  }
  return people;
}

export function parseLeadershipStaff(content: string): LeadershipStaffGroups {
  const eldersSection = content.match(/### Elders([\s\S]*?)(###|\#\#|$)/);
  const deaconsSection = content.match(/### Deacons([\s\S]*?)(###|\#\#|$)/);
  const staffSection = content.match(/## Staff([\s\S]*?)(###|\#\#|$)/);

  return {
    elders: eldersSection ? parseGroup(eldersSection[1]) : [],
    deacons: deaconsSection ? parseGroup(deaconsSection[1]) : [],
    staff: staffSection ? parseGroup(staffSection[1]) : [],
  };
}