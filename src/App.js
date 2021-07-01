import "./css/App.css";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";

function App() {
  return (
    <div className="container-fluid">
      <Navbar fetchData={fetchData}></Navbar>
      {!isFetching && <Main fetchData={fetchData} posts={posts}></Main>}
    </div>
  );
}

export default App;

// example icon use <span class="material-icons">face</span>
