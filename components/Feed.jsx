'use client'

import { useState, useEffect } from "react";

import KnowledgeCard from "./KnowledgeCard";

const KnowledgeCardList = ({ data, handleTagClick }) =>{
    return(
        <div className='mt-16 knowledge_layout'>
            {data.map((knowledge) => (
                <KnowledgeCard
                    key={knowledge._id}
                    knowledge={knowledge}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

const Feed = () => {
    const [allKnowledges, setAllKnowledges] = useState([]);

    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    useEffect(() =>{
        const fetchKnowledges = async () => {
            const response = await fetch('/api/knowledge');
            const data = await response.json();
            
            setAllKnowledges(data);
        }

        fetchKnowledges();
    }, []);

    const filterKnowledges = (searchtext) => {
        const regex = new RegExp(searchtext, "i");
        return allKnowledges.filter(
          (item) =>
            regex.test(item.creator.username) ||
            regex.test(item.tag) ||
            regex.test(item.title) ||
            regex.test(item.description)
        );
      };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);
    
        setSearchTimeout(
          setTimeout(() => {
            const searchResult = filterKnowledges(e.target.value);
            setSearchedResults(searchResult);
          }, 500)
        );
    }

    const handleTagClick = (tagName) => {
        setSearchText(tagName);
    
        const searchResult = filterKnowledges(tagName);
        setSearchedResults(searchResult);
      };

  return (
    <section className="feed">
        <form className="relative w-full flex-center">
            <input
                type="text"
                placeholder="Search for any keyword"
                value={searchText}
                onChange={handleSearchChange}
                required
                className="search_input peer"
            />
        </form>

        {searchText ? (
            <KnowledgeCardList
                data={searchedResults}
                handleTagClick={handleTagClick}
            />
        ): (
            <KnowledgeCardList
            data={allKnowledges}
            handleTagClick={handleTagClick}
          />
        )}   
    </section>
  )
}

export default Feed