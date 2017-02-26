
<div class="padding main-div">
        <h1>Url Shortener Microservice (aka Shrt-It)</h1>
        <div class="inset-div">
            <p>
                <strong>
                  User stories:
                </strong>
            </p>
            <div class="push-left">
              <p>
                   1) I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
              </p>
            </div>
            <div class="push-left">
              <p>
                   2) If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
              </p>
            </div>
            <div class="push-left">
              <p>
                   3) When I visit that shortened URL, it will redirect me to my original link.
              </p>
            </div>
        </div>
        <p>
          <strong>
            Example usage:
          </strong>
        </p>
<pre>
<a href="https://shrt-it.herokuapp.com/new/http://www.google.com">https://shrt-it.herokuapp.com/new/http://www.google.com</a>
</pre>
        <p>
          <strong>
            Example output:
          </strong>
        </p>
<pre>
  {
  original_url: "http://www.google.com",
  short_url: <a href="https://shrt-it.herokuapp.com/1">"https://shrt-it.herokuapp.com/1"</a>
  }
</pre>
