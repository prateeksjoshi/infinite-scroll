import logo from "./logo.svg";
import "./App.css";
import { Aside } from "./Sidebar";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/users?skip=${limit}`);
      const result = await response.json();
      setUsers((prev) => [...prev, ...result.users]);
      setLimit((prev) => prev + result.limit);
      if (result.users.length === 0) setHasMore(false);
    } catch (e) {}
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section className="app">
      <header className="app-header">Header</header>
      <section className="app-page">
        <Aside />
        <main className="app-content" id="appContent">
          <h4 style={{ margin: 0 }}>All Users</h4>
          {users && (
            <>
              <div className="app-user-wrapper">
                <InfiniteScroll
                  scrollableTarget={"appContent"}
                  dataLength={limit}
                  next={fetchUsers}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                >
                  {users?.map((user, index) => (
                    <div className="app-user-card" key={user.id}>
                      <div className="app-user-card-inner">
                        <p>{index + 1}</p>
                        <p>
                          <img src={user.image} width={50} height={50} />
                          {user.firstName} {user.lastName}
                        </p>
                        <p>{user.age} Years</p>
                        <p>{user.email}</p>
                        <p></p>
                      </div>
                    </div>
                  ))}
                </InfiniteScroll>
              </div>
            </>
          )}
        </main>
      </section>
    </section>
  );
}

export default App;
