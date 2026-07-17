<div class="container">

<h1>📚 MyLibrary - Mobile Library Management App</h1>

<p>
MyLibrary is a cross-platform mobile library management application developed using
<strong>React Native (Expo)</strong>. The application allows users to discover books,
read books, borrow and return books, manage their profiles, and maintain borrowing history.
Firebase Authentication and Cloud Firestore are used as the backend services, while books are
loaded using the <strong>Gutendex API</strong>.
</p>

<section>

<h2>📥 Downloads</h2>

<h3>📱 Android APK</h3>

<p>
Install the latest Android application directly on your device for testing.
</p>

<p>
<a href="https://expo.dev/artifacts/eas/5MkTRof-7jCuE0ERosFJNXHLX9r9Lz7O16r5yUY7SdQ.apk">
Download APK
</a>
</p>

<h3>🏪 Android App Bundle (AAB)</h3>

<p>
Download the Android App Bundle for publishing to the Google Play Store.
</p>

<p>
<a href="https://expo.dev/artifacts/eas/lDxKaI89BeAFPL0GH_D7PtRrLWKrihbdSUpzL_vrCOE.aab">
Download AAB
</a>
</p>

</section>

<section>

<h2>✨ Features</h2>

<h3>🔐 Authentication</h3>

<ul>
<li>User Registration</li>
<li>User Login</li>
<li>Firebase Authentication</li>
<li>User Logout</li>
</ul>

<h3>📖 Book Management</h3>

<ul>
<li>View Books</li>
<li>Search Books</li>
<li>Book Details</li>
<li>Read Books</li>
<li>Save Books as Draft</li>
<li>Publish Books</li>
<li>Update Books</li>
<li>Delete Books</li>
</ul>

<h3>📚 Borrowing System</h3>

<ul>
<li>Borrow Books</li>
<li>Return Books</li>
<li>View Borrowed Books</li>
<li>Borrow History</li>
</ul>

<h3>👤 User Profile</h3>

<ul>
<li>View Profile</li>
<li>Update Profile</li>
</ul>

<h3>🌐 External API</h3>

<ul>
<li>Gutendex Books API</li>
</ul>

</section>

<section>

<h2>🛠️ Technology Stack</h2>

<table>

<tr>
<th>Layer</th>
<th>Technology</th>
</tr>

<tr>
<td>Frontend</td>
<td>React Native (Expo), TypeScript</td>
</tr>

<tr>
<td>State Management</td>
<td>React Context API</td>
</tr>

<tr>
<td>Backend</td>
<td>Firebase Authentication</td>
</tr>

<tr>
<td>Database</td>
<td>Cloud Firestore</td>
</tr>

<tr>
<td>API</td>
<td>Gutendex API</td>
</tr>

</table>

</section>

<section>

<h2>📁 Project Structure</h2>

<pre>
MyLibrary

│
├── app/
├── components/
├── context/
├── hooks/
├── firebase/
├── services/
├── assets/
├── utils/
└── types/
</pre>

</section>

<section>

<h2>📱 Application Screens</h2>

<ul>
<li>Login</li>
<li>Register</li>
<li>Home</li>
<li>Search Books</li>
<li>Book Details</li>
<li>Read Book</li>
<li>Borrow Books</li>
<li>Borrow History</li>
<li>Profile</li>
</ul>

</section>

<section>

<h2>📡 API Used</h2>

<p>
<strong>Gutendex API</strong>
</p>

<pre>
https://gutendex.com/books
</pre>

</section>

<section>

<h2>🔥 Firebase Services</h2>

<ul>
<li>Firebase Authentication</li>
<li>Cloud Firestore</li>
</ul>

</section>

<section>

<h2>⚙️ Installation</h2>

<h3>Clone Repository</h3>

<pre>
git clone https://github.com/your-username/MyLibrary.git
</pre>

<h3>Install Dependencies</h3>

<pre>
npm install
</pre>

<h3>Run the Project</h3>

<pre>
npx expo start
</pre>

</section>

<section>

<h2>🗄️ Firestore Collections</h2>

<h3>Users</h3>

<pre>
users
 └── uid
      ├── name
      ├── email
      └── profileImage
</pre>

<h3>Books</h3>

<pre>
books
 └── id
      ├── title
      ├── author
      ├── description
      ├── image
      ├── status
      └── isPublished
</pre>

<h3>Borrow History</h3>

<pre>
borrowHistory
 └── id
      ├── userId
      ├── bookId
      ├── borrowDate
      ├── returnDate
      └── status
</pre>

</section>

<section>

<h2>🚀 Application Workflow</h2>

<ol>
<li>User registers or logs in.</li>
<li>Books are loaded from the Gutendex API.</li>
<li>User searches and browses books.</li>
<li>User reads, borrows, or returns books.</li>
<li>Borrow history is stored in Firestore.</li>
<li>Books can be saved as drafts, published, updated, or deleted.</li>
<li>User can update profile information.</li>
</ol>

</section>

<section>

<h2>📦 Dependencies</h2>

<ul>
<li>React Native</li>
<li>Expo</li>
<li>Expo Router</li>
<li>Firebase</li>
<li>React Context API</li>
<li>Async Storage</li>
<li>Lucide React Native</li>
</ul>

</section>

<section>

<h2>👩‍💻 Developer</h2>

<p>
<strong>Kokila Dewmini</strong><br>
Graduate Diploma in Software Engineering<br>
IJSE - Institute of Software Engineering
</p>

</section>

<div class="footer">

<p>© 2026 MyLibrary. Developed for educational purposes.</p>

</div>

</div>
