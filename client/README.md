# PM Acct Grid Mock

Wow, a lot of junk accumulated from trying about 7 or 8 different approaches.

The only issue is that there is no reliable way to tell what type of file is being dragged over the drop zone and therefore you can't give user feedback. Here is a note from the React Dropzone documentation:

> Mime type determination is not reliable across platforms. CSV files, for example, are reported as text/plain under macOS but as application/vnd.ms-excel under Windows. In some cases there might not be a mime type set at all.

## React File Drop

I took a look at [React File Drop](https://github.com/sarink/react-file-drop). I find it easier to understand and the feature where the drop zone lights-up when the drag enters the frame is really nice. But it doesn't solve the problem with determining types and isn't as widely used nor as frequently maintained.

## Conclusions

1. I could and want to look more into using mime types on different platforms to see if there is a work-around.
2. Time is up for this exploration. The current implementation meets my needs.
