figma.showUI(__html__, { width: 400, height: 300 });

let currentReferenceFrame = null;
let currentMatchingFrames = [];

figma.ui.onmessage = msg => {
  if (msg.type === 'find-similar-artboards') {
    const selection = figma.currentPage.selection;
    
    if (selection.length === 0) {
      return;
    }
    
    const referenceFrame = selection[0];
    
    if (referenceFrame.type !== 'FRAME') {
      return;
    }
    
    const referenceWidth = referenceFrame.width;
    const referenceHeight = referenceFrame.height;
    
    const topLevelFrames = figma.currentPage.children.filter(node => 
      node.type === 'FRAME' && 
      node.width === referenceWidth && 
      node.height === referenceHeight
    );
    
    figma.currentPage.selection = topLevelFrames;
    figma.viewport.scrollAndZoomIntoView(topLevelFrames);
    
    figma.closePlugin();
  } else if (msg.type === 'get-similar-frames') {
    const selection = figma.currentPage.selection;
    
    if (selection.length === 0) {
      figma.notify('Please select a frame to use as reference');
      return;
    }
    
    const referenceFrame = selection[0];
    
    if (referenceFrame.type !== 'FRAME') {
      figma.notify('Please select a frame (not other node types)');
      return;
    }
    
    currentReferenceFrame = referenceFrame;
    
    // Find frames with similar dimensions (±10px tolerance)
    const tolerance = 10;
    const referenceWidth = referenceFrame.width;
    const referenceHeight = referenceFrame.height;
    
    const similarFrames = figma.currentPage.children.filter(node => 
      node.type === 'FRAME' && 
      Math.abs(node.width - referenceWidth) <= tolerance &&
      Math.abs(node.height - referenceHeight) <= tolerance
    );
    
    currentMatchingFrames = similarFrames;
    
    // Send frame data to UI
    figma.ui.postMessage({
      type: 'similar-frames-found',
      data: {
        reference: {
          name: referenceFrame.name,
          width: Math.round(referenceFrame.width),
          height: Math.round(referenceFrame.height)
        },
        frames: similarFrames.map(frame => ({
          id: frame.id,
          name: frame.name,
          width: Math.round(frame.width),
          height: Math.round(frame.height)
        }))
      }
    });
  } else if (msg.type === 'preview-resize') {
    const { width, height } = msg;
    
    if (!currentMatchingFrames.length) {
      figma.notify('No frames found to resize');
      return;
    }
    
    // Send preview data to UI
    figma.ui.postMessage({
      type: 'preview-data',
      data: {
        frames: currentMatchingFrames.map(frame => ({
          name: frame.name,
          width: Math.round(frame.width),
          height: Math.round(frame.height)
        })),
        newWidth: width,
        newHeight: height
      }
    });
  } else if (msg.type === 'apply-resize') {
    const { width, height } = msg;
    
    if (!currentMatchingFrames.length) {
      figma.notify('No frames found to resize');
      return;
    }
    
    // Apply resize to all matching frames
    currentMatchingFrames.forEach(frame => {
      frame.resize(width, height);
    });
    
    figma.notify(`Resized ${currentMatchingFrames.length} frames to ${width}×${height}`);
    
    // Reset state
    currentReferenceFrame = null;
    currentMatchingFrames = [];
    
    // Notify UI that resize is complete
    figma.ui.postMessage({
      type: 'resize-complete'
    });
  }
};