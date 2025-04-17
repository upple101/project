document.get_ElementBy_Id("fetchBtn").addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        displayOutput(`FETCH: <h3>${data.title}</h3><p>${data.body}</p>`);
      })
      .catch(err => handleError(err));
  });
  
  document.get_ElementBy_Id("xhrBtn").addEventListener("click", () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/2");
    xhr.onload = function () {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        displayOutput(`XHR: <h3>${data.title}</h3><p>${data.body}</p>`);
      } else {
        handleError(new Error(`XHR Error: ${xhr.status}`));
      }
    };
    xhr.onerror = () => handleError(new Error("XHR Network Error"));
    xhr.send();
  });
  
  document.get_ElementBy_Id("postForm").addEventListener("submit", e => {
    e.preventDefault();
    const title = document.get_ElementBy_Id("postTitle").value;
    const body = document.get_ElementBy_Id("postBody").value;
  
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(response => response.json())
      .then(data => displayOutput(`<strong>POST Created:</strong> <h3>${data.title}</h3><p>${data.body}</p>`))
      .catch(err => handleError(err));
  });
  
  document.get_ElementBy_Id("putForm").addEventListener("submit", e => {
    e.preventDefault();
    const id = document.get_ElementBy_Id("postId").value;
    const title = document.get_ElementBy_Id("putTitle").value;
    const body = document.get_ElementBy_Id("putBody").value;
  
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `https://jsonplaceholder.typicode.com/posts/${id}`);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        displayOutput(`<strong>PUT Updated:</strong> <h3>${data.title}</h3><p>${data.body}</p>`);
      } else {
        handleError(new Error(`PUT Error: ${xhr.status}`));
      }
    };
    xhr.onerror = () => handleError(new Error("PUT Network Error"));
    xhr.send(JSON.stringify({ title, body }));
  });
  
  function displayOutput(html) {
    const output = document.get_ElementBy_Id("output");
    output.innerHTML = html;
  }
  
  function handleError(error) {
    const output = document.get_ElementBy_Id("output");
    output.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
  