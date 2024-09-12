import React from 'react';

const posts = [
  {
    id: 1,
    title: 'First Post',
    content: 'This is the content of the first post. It provides some initial information on the topic.'
  },
  {
    id: 2,
    title: 'Second Post',
    content: 'This is the content of the second post. It delves deeper into the subject matter.'
  },
  {
    id: 3,
    title: 'Third Post',
    content: 'Here is some content for the third post. It includes additional details and insights.'
  },
  {
    id: 4,
    title: 'Fourth Post',
    content: 'Content for the fourth post is provided here. It continues the discussion on the topic.'
  },
  {
    id: 5,
    title: 'Fifth Post',
    content: 'The fifth post contains further content and expands on the ideas presented earlier.'
  },
  {
    id: 6,
    title: 'Sixth Post',
    content: 'Here is the sixth post. It offers even more information and analysis on the topic.'
  },
  {
    id: 7,
    title: 'Seventh Post',
    content: 'The seventh post concludes our series with final thoughts and reflections on the subject.'
  }
];

const HomePage = () => {
  return (
    <div className="text-gray-900 bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Posts</h1>
        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map(post => (
              <div key={post.id} className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700">{post.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No Posts available</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
