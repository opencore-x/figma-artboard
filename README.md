# openboard (Figma Plugin)

## Add Missing Artboard Features to Figma

`openboard` is a powerful Figma plugin designed to streamline your workflow when dealing with multiple artboards (Figma Frames) of similar or inconsistent sizes. It provides two core functionalities: quickly finding artboards with identical dimensions and precisely correcting the size of a group of similarly sized artboards.

Whether you're trying to standardize your design files or quickly locate all screens of a specific breakpoint, `openboard` helps you maintain consistency and efficiency.

## Features

`openboard` offers two distinct modes to help you manage your artboards:

1.  ### Find Similar Artboards
    * **Purpose**: Instantly select all top-level frames on your current page that have the **exact same width and height** as a selected reference frame.
    * **Use Case**: Ideal for quickly isolating all screens of a specific device size (e.g., all iPhone X artboards) or finding duplicates.
    * **How it works**:
        1.  Select any frame on your canvas.
        2.  Run the plugin and choose "Find Similar Artboards".
        3.  All frames on the current page that exactly match the dimensions of your selected frame will be automatically selected and zoomed into view.

2.  ### Correct Artboard Size
    * **Purpose**: Identify frames with dimensions similar to a selected reference frame (within a 10px tolerance) and then batch resize them to new, specified dimensions.
    * **Use Case**: Perfect for standardizing slightly off-sized artboards, updating a set of screens to a new responsive breakpoint, or fixing minor inconsistencies across your file.
    * **How it works**:
        1.  Run the plugin and choose "Correct Artboard Size".
        2.  **Step 1: Select Reference Frame**: Select a frame on your canvas that represents the dimensions you want to match against. Click "Continue".
        3.  **Step 2: Enter New Dimensions**: The plugin will show you the dimensions of your selected reference frame. Enter the desired new `Width` and `Height` for the matching artboards.
        4.  **Step 3: Preview Changes**: Click "Preview Changes" to see a list of all frames that will be affected (those within ±10px of your reference frame's original dimensions). Each item will show its current dimensions and the new dimensions it will be resized to.
        5.  **Step 4: Apply Changes**: If the preview looks correct, click "Apply Changes" to resize all listed frames.

## Installation

1.  **Download the Plugin**: Clone this repository or download the ZIP file.
2.  **Open Figma Desktop App**: Ensure you are using the Figma desktop application.
3.  **Import Plugin**:
    * Go to `Plugins` > `Development` > `Import Plugin from Manifest...`
    * Navigate to the downloaded `openplugin-figma` folder and select the `manifest.json` file.
4.  **Run the Plugin**: You can now find `openboard` in your `Plugins` menu under `Development` or in the quick actions search (CMD/CTRL + / and type "openboard").

## Development

To set up the project for development:

1.  Clone the repository:
    ```bash
    git clone [https://github.com/opencore-x/openplugin-figma.git](https://github.com/opencore-x/openplugin-figma.git)
    cd openplugin-figma
    ```
2.  No special build steps are required for this plugin, as it uses plain JavaScript and HTML.
3.  Load the plugin into Figma using `manifest.json` as described in the Installation section.
4.  Make your changes to `code.js` and `ui.html`. Changes will be reflected when you re-run the plugin in Figma.

## Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or find any bugs, please feel free to:

* Open an [issue](https://github.com/opencore-x/openplugin-figma/issues)
* Submit a [pull request](https://github.com/opencore-x/openplugin-figma/pulls)

Please ensure your code adheres to good practices and include clear descriptions for issues and pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/opencore-x/openplugin-figma/blob/main/LICENSE) file for details.

---