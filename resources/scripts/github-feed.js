/*
  Script Name: github-feed.js,
  Script Description: GitHub Feed populates an HTML div with github repositories (projects).
  It pulls the data from the GitHub API and presents it using Javascript DOM manipulation.
  Note: Will only work Desktop due to mobile needing greater screen real estate for actual content.
*/

/*
  Utilising Global Array to Store All Image Objects with Title,
  Description (not shown on current model), Source of Image
*/

/* GitHub Account Name */

const accountName = 'SherbazHashmi';

/* API URL */

const apiURL = 'https://api.github.com';

/* Feed (Initialised as Empty) */

let feed = [];

/* Post Counter Either True or False to Determine Which Colour to Fill Cell */

let postCounter = false;

/* Reference to Feed DOM Element */

const feedContentObject = document.getElementsByClassName('feed-container__content')[0];

/* Hiding Feed DOM Element */

document.getElementById('feed-container').hidden = true;

/*
  Function Name : getGithubFeed 
  Description: Pulls Github Feed from github servers using a REST Get call
*/

const getGithubFeed = async() => {
  const projects = await fetch(`${apiURL}/users/${accountName}/repos`);
  const jsonProjects = await projects.json();
  feed = jsonProjects;
  console.log(feed);
};


/*
  Function Name : addPostToFeed
  Description: Function that takes in a post object and creates it into a HTML node and appends to 
  Feed Content DOM element
*/

const addPostToFeed = (post) => {
  let { full_name, name, description, default_branch } = post;
  if (!description) {
    description = 'No description provided for this project. Please contact Sherbaz if you have any questions.';
  }

  const downloadLink = `https://github.com/${full_name}/archive/${default_branch}.zip`;
  const viewLink = `https://github.com/${full_name}`;
  const commitsLink = `https://github.com/${full_name}/commits/${default_branch}`;
  console.log(downloadLink);
  const postObj = document.createElement('div');
  const cl = `feed-container__content__cell ${postCounter ? 'light' : 'dark'} `;
  postObj.setAttribute('class', cl);
  postCounter = !postCounter;
  postObj.innerHTML = `
  <div class="feed-container__content__cell__name">${name}</div>
  <div class="feed-container__content__cell__description">${description}</div>
  <div class="feed-container__content__cell__buttons">
    <a href="${viewLink}"> <div class="btn view">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"/></svg>
      <span>View</span>
    </div> </a>
    <a href="${commitsLink}"><div class="btn fork">
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"/></svg>
      <span>Commits</span>
    </div> </a>
    <a href="${downloadLink}"> <div class="btn download">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"/></svg>
      <span>Download</span>
    </div> </a>
  </div>
  `;
  feedContentObject.appendChild(postObj);
};

/*
  Function Name : populateFeed
  Description: Populates the feed with posts utilizing the addPostToFeed function.
*/
const populateFeed = () => {
  feed.map((post) => {
    return addPostToFeed(post);
  });
};

/*
  Function Name : setupFeed
  Description: Sets the feed up with getting the github feed and then populating feed content object.
*/

const setupFeed = async() => {
  await getGithubFeed();
  populateFeed();
}


/*
 Setup Feed is Run
*/
setupFeed();


/*
  Function Name : toggleFeed
  Description: Handles hiding the feed on exit and showing it on button.
*/

const toggleFeed = (element) => {
  const id = element.id;
  const feed = document.getElementById('feed-container');
  const button = document.getElementById('github-button');
  switch (id) {
    case button.id:
      feed.hidden = false;
      button.hidden = true;
      break;
    case (feed.id + '__title__exit'):
      feed.hidden = true;
      button.hidden = false;
      break;
    default:
      console.log(`Current object ${element} is not compatible with feed library`)
      break;
  }
}