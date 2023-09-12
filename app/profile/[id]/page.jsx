'use client'

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userKnowledges, setUserKnowledges] = useState([]);

  useEffect(() => {
    const fetchKnowledges = async () => {
      const response = await fetch(`/api/users/${params?.id}/knowledges`);
      const data = await response.json();

      setUserKnowledges(data);
    };

    if (params?.id) fetchKnowledges();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`${userName}'s profile page.`}
      data={userKnowledges}
    />
  );
};

export default UserProfile;