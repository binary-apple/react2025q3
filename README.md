# React performance

This is RS School React course assignment.

## 🚀 Overview

React + TypeScript app that loads a large CO₂ dataset (~100 MB).

Optimized with **useMemo**, **useCallback**, **React.memo**, and **React Suspense**.

## 📊 Performance

Profiled with React Dev Tools before & after optimization.

### Summary

#### Render duration

| Interaction              | Before, ms | After, ms |   Δ |
| ------------------------ | ---------: | --------: | --: |
| Sorting (population asc) |       76.4 |           |     |
| Sorting (name desc)      |      283.3 |           |     |
| Searching a country      |       90.7 |           |     |
| Selecting a year         |      308.2 |           |     |
| Adding columns (+3)      |      127.2 |           |     |
| Removing columns (-3)    |      143.5 |           |     |

## Before

- ### Sorting (population asc)
  - **Commit Duration:** 77.4ms
  - **Render Duration:** 76.4ms
  - **Interaction:** User selects "Population ↑" from the sort dropdown to sort all countries by population in ascending order.
  - **Flame Graph:**  
    ![Profiler Flamegraph](./src/assets/before-sorting-pop-flamegraph.png)
  - **Ranked Chart:**  
    ![Profiler Ranked Chart](./src/assets/before-sorting-pop-ranked.png)

- ### Sorting (name desc)
  - **Commit Duration:** 287.5ms
  - **Render Duration:** 283.3ms
  - **Interaction:** User selects "Name ↓" from the sort dropdown to sort all countries alphabetically in descending order.
  - **Flame Graph:**  
    ![Profiler Flamegraph](./src/assets/before-sorting-name-flamegraph.png)
  - **Ranked Chart:**  
    ![Profiler Ranked Chart](./src/assets/before-sorting-name-ranked.png)

- ### Searching a country
  - **Commit Duration:** 91.7ms
  - **Render Duration:** 90.7ms
  - **Interaction:** User types a search term into the search input field and clicks the "Search" button to filter the country list.
  - **Flame Graph:**  
    ![Profiler Flamegraph](./src/assets/before-searching-flamegraph.png)
  - **Ranked Chart:**  
    ![Profiler Ranked Chart](./src/assets/before-searching-ranked.png)

- ### Selecting a year
  - **Commit Duration:** 310.3ms
  - **Render Duration:** 308.2ms
  - **Interaction:** User selects a different year from the year dropdown to update statistics to that year.
  - **Flame Graph:**  
    ![Profiler Flamegraph](./src/assets/before-year-selecting-flamegraph.png)
  - **Ranked Chart:**  
    ![Profiler Ranked Chart](./src/assets/before-year-selecting-ranked.png)

- ### Adding columns (+3)
  - **Commit Duration:** 128.2ms
  - **Render Duration:** 127.2ms
  - **Interaction:** User opens the "Select columns" modal and enables three additional optional columns in the table.
  - **Flame Graph:**  
    ![Profiler Flamegraph](./src/assets/before-adding-columns-flamegraph.png)
  - **Ranked Chart:**  
    ![Profiler Ranked Chart](./src/assets/before-adding-columns-ranked.png)

- ### Removing columns (-3)
  - **Commit Duration:** 144.6ms
  - **Render Duration:** 143.5ms
  - **Interaction:** User opens the "Select columns" modal again and disables the previously added three optional columns from the table.
  - **Flame Graph:**  
    ![Profiler Flamegraph](./src/assets/before-removing-columns-flamegraph.png)
  - **Ranked Chart:**  
    ![Profiler Ranked Chart](./src/assets/before-removing-columns-ranked.png)
