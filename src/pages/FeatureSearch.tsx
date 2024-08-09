import { useEffect } from "react";
import { debounce } from "lodash";
import React, { useState } from "react";

import "../styles/App.css";
import Input from "../components/Input";
import Loading from "../components/Loading";
import Results from "../components/Results";
import FeedbackForm from "../components/FeedbackForm";
import FilterButton from "../components/FilterButton";

import axios from "axios";
import PageLoading from "../components/PageLoading";

interface Filter {
  id: any;
  code: any;
  title: any;
  isActive: boolean;
}

function FeatureSearch() {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [activities, setActivities] = useState<any[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

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
        const payload = {
          query: null,
          start_date: null,
          start_time: null,
          tag_ids: [],
          page: 1,
          page_size: 20,
        };
        console.log("Use Effect Payload: ", payload);
        try {
          const response = await axios.post(
            "http://ec2-54-90-82-170.compute-1.amazonaws.com:9000/v1/events/search",
            payload
          );
          setActivities(response.data.activities);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const updateActivities = async () => {
    if (!hasMoreData) return; // Exit early if there's no more data

    let input: any = inputValue;
    if (inputValue === "") {
      input = null;
    }
    const activeFilters = filters.filter((filter) => filter.isActive);
    const tag_ids = activeFilters.map((filter) => filter.id);
    const payload = {
      query: input,
      start_date: dateValue,
      start_time: timeValue,
      tag_ids: tag_ids,
      page: page,
      page_size: 20,
    };
    console.log("Update Activities Payload: ", payload);
    try {
      const response = await axios.post(
        "http://ec2-54-90-82-170.compute-1.amazonaws.com:9000/v1/events/search",
        payload
      );
      console.log(response.data.activities);
      if (response.data.activities.length === 0) {
        setHasMoreData(false);
      } else {
        setActivities((prevActivities) => [
          ...prevActivities,
          ...response.data.activities,
        ]);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setHasMoreData(false); // Assume no more data in case of error
    } finally {
      setPageLoading(false);
    }
  };

  const handleScroll = debounce(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (
      scrollTop + clientHeight >= scrollHeight &&
      !pageLoading &&
      hasMoreData
    ) {
      console.log("Handle Scroll Fired");
      setPage((prevPage) => prevPage + 1);
      setPageLoading(true);
    }
  }, 300);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, hasMoreData]);

  useEffect(() => {
    if (page > 1) {
      updateActivities();
    }
  }, [page]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFeedbackToggle = () => {
    setShowFeedback(!showFeedback);
  };

  const handleInputSubmit = async () => {
    setActivities([]);
    setIsLoading(true);
    setHasMoreData(true); // Reset hasMoreData
    setPage(1); // Reset page to 1
    let input: any = inputValue;
    if (inputValue === "") {
      input = null;
    }
    const activeFilters = filters.filter((filter) => filter.isActive);
    const tag_ids = activeFilters.map((filter) => filter.id);
    const payload = {
      query: input,
      start_date: dateValue,
      start_time: timeValue,
      tag_ids: tag_ids,
      page: 1,
      page_size: 20,
    };
    console.log("Payload: ", payload);
    try {
      const response = await axios.post(
        "http://ec2-54-90-82-170.compute-1.amazonaws.com:9000/v1/events/search",
        payload
      );
      console.log(response.data.activities);
      setActivities(response.data.activities);
      if (response.data.activities.length === 0) {
        setHasMoreData(false);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setHasMoreData(false);
    }
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
        filter.id === id ? { ...filter, isActive: isActive } : filter
      )
    );
    console.log(filters);
  };

  const handleDateChange = (date: any) => {
    if (date === "") {
      setDateValue(null);
    } else {
      setDateValue(date);
    }
  };

  const handleTimeChange = (time: any) => {
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
              title={filter.title}
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
        onFeedback={handleFeedbackToggle}
        onKeyPress={handleOnKeyPress}
        onDateChange={handleDateChange}
        onTimeChange={handleTimeChange}
      />
      {showFeedback && (
        <div className="feedback-container">
          <FeedbackForm />
        </div>
      )}
      {isLoading && <Loading />}
      {activities.length > 0 && <Results activities={activities} />}
      {!isLoading && activities.length === 0 && (
        <h1 className="results-container">
          No Results - Try a different query...
        </h1>
      )}
      {pageLoading && <PageLoading />}
    </>
  );
}

export default FeatureSearch;
