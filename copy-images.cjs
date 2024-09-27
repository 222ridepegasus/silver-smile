const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

// Ghost (Rose Eagle) API endpoint and Content API Key
const ghostUrl = 'http://127.0.0.1:2369'; // Force IPv4 loopback
const contentApiKey = '5a444c4877522653c66fd86ccd'; // Your new working API key
const imageDir = path.join(__dirname, 'public/images'); // Silver Smile's image directory

// Ensure the images directory exists in Silver Smile
fs.ensureDirSync(imageDir);

// Fetch all posts from Rose Eagle (Ghost blog)
async function fetchRoseEaglePosts() {
  try {
    console.log('Fetching posts from Rose Eagle...');
    const response = await axios.get(`${ghostUrl}/ghost/api/v3/content/posts/?key=${contentApiKey}&limit=all`);
    console.log(`Fetched ${response.data.posts.length} posts from Rose Eagle.`);
    return response.data.posts;
  } catch (error) {
    console.error('Error fetching posts from Rose Eagle:', error.message);
    return [];
  }
}

// Download an image and save it to Silver Smile's /public/images directory
async function downloadImage(url, filename) {
  // Replace localhost with 127.0.0.1 to ensure IPv4 is used
  const updatedUrl = url.replace('localhost', '127.0.0.1');
  try {
    console.log(`Downloading image: ${updatedUrl}`);
    const response = await axios({
      url: updatedUrl,
      responseType: 'stream',
    });

    const imagePath = path.join(imageDir, filename);
    const writer = fs.createWriteStream(imagePath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`Failed to download image: ${updatedUrl}`, error.message);
  }
}

// Generate a valid filename from a URL
function getFilenameFromUrl(url) {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 1];
}

// Main function to fetch posts, download images, and update paths for Silver Smile
async function downloadImagesForSilverSmile() {
  const posts = await fetchRoseEaglePosts();
  if (!posts || posts.length === 0) {
    console.log('No posts found in Rose Eagle.');
    return;
  }

  for (const post of posts) {
    if (post.feature_image) {
      const imageUrl = post.feature_image;
      const filename = getFilenameFromUrl(imageUrl);

      // Download the image to Silver Smile's /public/images directory
      await downloadImage(imageUrl, filename);

      // Log the path change (you can automate this update in Astro templates)
      console.log(`Post: ${post.title}`);
      console.log(`Old Image Path (Rose Eagle): ${imageUrl}`);
      console.log(`New Image Path (Silver Smile): /images/${filename}`);
    }
  }
}

// Run the script
downloadImagesForSilverSmile();