import { useEffect } from "react";
import React, { useState } from "react";

import "../styles/App.css";
import FilterButton from "../components/FilterButton";
import Input from "../components/Input";
import Loading from "../components/Loading";
import Results from "../components/Results";

import axios from "axios";

interface Filter {
  id: any;
  code: string;
  isActive: boolean;
}

function FeatureSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [dateValue, setDateValue] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [timeValue, setTimeValue] = useState("morning");
  const [filters, setFilters] = useState<Filter[]>([]);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://ec2-54-90-82-170.compute-1.amazonaws.com:9000/v1/event-tags"
        );
        const filtersData = response.data.items.map((filter: any) => ({
          ...filter,
          isActive: false,
        }));
        setFilters(filtersData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = async () => {
    setIsLoading(true);
    const activeFilters = filters.filter((filter) => filter.isActive);
    const tag_ids = activeFilters.map((filter) => filter.id);
    if (!inputValue) {
      alert("Please enter a query");
      return;
    }
    const payload = {
      query: inputValue,
      start_date: dateValue,
      start_time: timeValue,
      tag_ids: tag_ids,
    };
    console.log("Payload: ", payload);
    try {
      const response = await axios.post(
        "http://ec2-54-90-82-170.compute-1.amazonaws.com:9000/v1/events/search",
        payload
      );
      console.log(response.data.activities);
      setActivities(response.data.activities);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
    setInputValue("");
    setIsLoading(false);
  };

  const handleOnKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleInputSubmit();
    }
  };

  const handleFilterToggle = (isActive: boolean, id: any) => {
    setFilters(
      filters.map((filter) =>
        filter.id === id ? { ...filter, isActive } : filter
      )
    );
  };

  const handleDateChange = (date: string) => {
    setDateValue(date);
  };

  const handleTimeChange = (time: string) => {
    setTimeValue(time);
  };

  return (
    <>
      <div className="results-container">
        <div className="filter-grid">
          {filters.map((filter) => (
            <FilterButton
              key={filter.id}
              id={filter.id}
              label={filter.code}
              isActive={filter.isActive}
              onToggle={handleFilterToggle}
            />
          ))}
        </div>
      </div>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onSubmit={handleInputSubmit}
        onKeyPress={handleOnKeyPress}
        onDateChange={handleDateChange}
        onTimeChange={handleTimeChange}
      />
      {isLoading && <Loading />}
      {activities.length > 0 ? (
        <Results
          activities={activities}
          class_name={"feature-results-scroll"}
        />
      ) : (
        <h1 className="results-container">
          No Results - Try a different query...
        </h1>
      )}
    </>
  );
}

export default FeatureSearch;
