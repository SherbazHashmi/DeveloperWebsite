/*
  Script Name: gallery.js,
  Script Description: GalleryJS is a script written to be modular, lightweight
   and lacking dependencies to provide gallery functionality to any website.
  Author: Sherbaz Hashmi u6409914.
*/

/*
  Utilising Global Array to Store All Image Objects with Title,
  Description (not shown on current model), Source of Image
*/
this.images = [{
    title: 'Shout Out\'s Award Win',
    description: 'Shout Out Won Young Scholar of The Year Award 2019',
    source: 'resources/img/featured-project/ys-award.png',
  },
  {
    title: 'Shout Out\'s Process Overview',
    description: 'Shout Out\'s Process is composed of four phases, Community Reprting, Moderation, Prioritsation and Task Allocation.',
    source: 'resources/img/map.png',
  },
  {
    title: 'Community Reporting Shout Out',
    description: '',
    source: 'resources/img/featured-project/ip.png',
  },
  {
    title: 'Moderation Panel Through Web Map Application',
    description: '',
    source: 'resources/img/featured-project/mod.png',
  },
  {
    title: 'Prioritisation Through Web Map Application',
    description: '',
    source: 'resources/img/featured-project/pd.png',
  },
  {
    title: 'Task Allocation Through Dashboard',
    description: '',
    source: 'resources/img/featured-project/task-allocation.png',
  },
  {
    title: 'Utilizes an ESRI Stack',
    description: '',
    source: 'resources/img/featured-project/ss.png',
  },
  {
    title: 'Survey123 Architecture',
    description: '',
    source: 'resources/img/featured-project/survey.png',
  },
  {
    title: 'Platform Agnostic Solution',
    description: '',
    source: 'resources/img/featured-project/pa.png',
  },
  {
    title: 'Full Interactive Web Maps for Visualisation',
    description: '',
    source: 'resources/img/featured-project/wm.png',
  },
];

// Index of Currently Selected Image in Array
let currentImage = 0;


/*
  Function Name : Switch Image
  Description : Switching the image in the image view based on an index value of images array

*/

var switchImage = (index) => {
  const image = document.getElementById('galleryImage');
  const source = images[index].source;
  image.setAttribute('src', source);
  const title = document.getElementById('image-title');
  title.innerText = images[index].title;

}

/* 
  Function Name: Generate Image Tile
  Description: Generates Image Tiles of Each Image in Image Object and Populates 
    the preview tiles at the bottom of image preview window with them.
*/
const generateImageTiles = () => {
  const tileContainer = document.getElementsByClassName('preview-tiles')[0];
  const widthAvailable = document.getElementsByClassName('image')[0].clientWidth;
  let imageSide = (widthAvailable) / images.length;
  while (imageSide > tileContainer.clientHeight) {
    imageSide -= 1;
  }
  for (const image of images) {
    const img = document.createElement('img');
    img.setAttribute('src', `${image.source}`);
    img.setAttribute('width', imageSide);
    img.setAttribute('height', imageSide);
    img.setAttribute('style', 'object-fit: contain');
    img.setAttribute('onclick', `clickImage('${image.source}')`);
    tileContainer.appendChild(img);
  }
};

/*
  Function Name: Size Overlays
  Description: Sizes all overlays (in this case just the one on top of image preview)
  to fit over the content it's meant to hover over. In this case, it's just there
  to contain the arrows to shift to the next and previous image.
*/
const sizeOverlays = (resize) => {
  const overlays = document.getElementsByClassName('overlay');
  for (const overlay of overlays) {
    const image = document.getElementsByClassName('image')[0];
    const height = image.clientHeight;
    const width = image.clientWidth;
    let difference = 0;
    if (!resize) {
      for (const child of overlay.children) {
        difference += child.clientHeight;
      }
    }

    overlay.setAttribute('style', `
      height: ${height - difference}px;
      width: ${width}px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      z-index: 2;`);
  }
};

/*
  Function Name : None (Anonymous)
  Description: When the window loads, I set the image preview to the first image in array.
  size the button overlay and then size the image preview window.
*/
window.onload = function() {
  switchImage(0);
  sizeOverlays(false);
};

/*
  Function Name: None (Anonymous)
  Description: On window resize the button overlays will be resized to adapt to window changing
*/
window.onresize = function() {
  sizeOverlays(true);
};

/*
  Function Name: Next Image
  Description: Triggered when the next image button is pressed on the overlay.
  Switches image based on global current image index variable.
*/
const nextImage = () => {
  const desiredImageIndex = currentImage += 1;
  if (desiredImageIndex > images.length - 1) {
    currentImage = 0;
  } else {
    currentImage = desiredImageIndex;
  }
  switchImage(currentImage);
};

/*
  Function Name: Prev Image
  Description: Triggered when the previous image button is pressed on the overlay.
  Switches image based on global current image index variable.
*/
const prevImage = () => {
  const desiredImageIndex = currentImage -= 1;
  if (desiredImageIndex < 0) {
    currentImage = images.length - 1;
  } else {
    currentImage = desiredImageIndex;
  }
  switchImage(currentImage);
};
/*
  Function Name: Click Image
  Description: Triggered when a gallery tile is pressed.
  Switches image based on the image which was pressed by passing in the source.
*/
const clickImage = (source) => {
  for (let i = 0; i < images.length; i++) {
    if (images[i].source == source) {
      switchImage(i);
      currentImage = i;
      break;
    };
  };
}



/*
  Image Tile Generation is Run as first function call in script.
*/

generateImageTiles();