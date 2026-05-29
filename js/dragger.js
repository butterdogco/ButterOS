const resizeThreshold = 50; // Distance from the bottom-right corner to start resizing
const topRightThresholdX = 120; // Distance from the top-right corner to start resizing
const topRightThresholdY = 28; // Distance from the top-right corner to start resizing

function dragElement(element) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var isResizing = false;

  element.addEventListener("mousedown", function(event) {
    // Check if the mouse is near the bottom-right corner for resizing
    const isInCorner = isNearTopRightCorner(event);
    if (isInCorner) {
      return; // Do nothing if in the top-right corner to allow other interactions (like maximize)
    }

    // Check if clicking another interactive element (like buttons) within the window
    if (event.target.closest("button, .window-controls")) {
      return; // Do nothing if clicking on buttons or window controls
    }

    // Check left mouse button
    if (event.button !== 0 && event.button !== undefined) {
      return; // Only allow dragging with the left mouse button
    }

    // Check if near resize area
    if (isNearResizeArea(event)) {
      isResizing = true;
      document.onmousemove = elementResize;
      document.onmouseup = closeResizeElement;
      event.preventDefault(); // Prevent the drag when resizing
    } else {
      dragMouseDown(event); // Otherwise, start dragging
    }
  });

  function isNearTopRightCorner(e) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left; // Get the x position relative to the element
    const y = e.clientY - rect.top;  // Get the y position relative to the element

    // console.log(`Mouse position relative to element: (${x}, ${y})`); // Debugging log
    // console.log(`Element dimensions: width=${rect.width}, height=${rect.height}`); // Debugging log
    // console.log(`Top-right threshold: (${rect.width - topRightThresholdX}, ${topRightThresholdY})`); // Debugging log

    // Check if the mouse is within the threshold of the top-right corner
    return (x >= rect.width - topRightThresholdX && x <= rect.width && y >= 0 && y <= topRightThresholdY);
  }

  // Check if the mouse is near the bottom-right corner
  function isNearResizeArea(e) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    // Check if the mouse is within the threshold of the bottom-right corner
    return (x >= rect.right - resizeThreshold && y >= rect.bottom - resizeThreshold);
  }

  // Function to resize the element
  function elementResize(e) {
    if (isResizing) {
      const iframe = element.querySelector("iframe");
      if (iframe) {
        iframe.style.pointerEvents = "none";
      }
      element.classList.remove("maximized"); // Remove maximized class when resizing
      const width = e.clientX - element.getBoundingClientRect().left;
      const height = e.clientY - element.getBoundingClientRect().top;
      element.style.width = width + 'px';
      element.style.height = height + 'px';
    }
  }

  function closeResizeElement() {
    const iframe = element.querySelector("iframe");
    if (iframe) {
      iframe.style.pointerEvents = "auto";
    }
    document.onmousemove = null;
    document.onmouseup = null;
    isResizing = false;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    const iframe = element.querySelector("iframe");
    if (iframe) {
      iframe.style.pointerEvents = "none";
    }
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    if (!isResizing) { // Only move the element if not resizing
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
    }
  }

  function closeDragElement() {
    const iframe = element.querySelector("iframe");
    if (iframe) {
      iframe.style.pointerEvents = "auto";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }
}
