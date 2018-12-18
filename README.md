# render3D
rendering the pcd files 

How to run
---

On Chrome
  In the terminal, install a mini server: ´npm install -g pushserve´. Then, navigate to the project root folder 
  and run 'pushserve'. It will create a localhost.
On firefox
  Just open the index.html

There is a video that shows the visualisation of the scanner over 7s.

Methods
---
Using the repository Hybird we generate 3d point cloud files (pcd) of the rorated scan. 
Using three.js we generate an animation of all the frames recorded. In this case we recorded worth of 7s frame.
By uploading each pcd file, we render a mesh corresponding to a frame. Each mesh is added every 1 sec which can be modified easily. 
Indeed the real timestamps can be used by simply modifiying the time when we consider that a new frame should be rendered.

