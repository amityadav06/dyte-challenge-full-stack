import React, { useState } from "react";

const DashBoard = () => {
  const [urls, setUrls] = useState("");
  const [userUrl, setUserUrl] = useState([]);

  const handleUrl = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/shorturl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urls,
        }),
      });
      const data = await res.json();
      setUserUrl([data]);
      if (!res.status === 200 || !data) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h1>URL Shrinker</h1>
      <form method="POST" className="my-4 form-inline">
        <label htmlFor="fullUrl" className="sr-only">
          Url
        </label>
        <input
          required
          placeholder="Url"
          type="url"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          name="fullUrl"
          id="fullUrl"
          className="form-control col mr-2"
        />
        <button onClick={handleUrl} className="btn btn-success" type="submit">
          Shrink
        </button>
      </form>
      <div className="tablee-container">
        <table className="tablee">
          <thead>
            <tr>
              <th>Full URL</th>
              <th>Short URL</th>
              <th>Clicks</th>
            </tr>
          </thead>
          <tbody>
            {userUrl.map((item) => {
              const { short_url, long_url, clicks } = item;
              return (
                <tr key={short_url}>
                  <td data-label="Full URL">
                    <a href={long_url}>{long_url}</a>
                  </td>
                  <td data-label="Short URL">
                    <a href={short_url}>{short_url}</a>
                  </td>
                  <td data-label="Clicks">{clicks}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashBoard;
