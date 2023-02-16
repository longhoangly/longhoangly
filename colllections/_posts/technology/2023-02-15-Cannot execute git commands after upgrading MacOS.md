---
author: Long
layout: post
excerpt_separator: <!--short_desc-->
---

After upgrading the MacOS to new version, I cannot execute git commands with an error. Here is how I resolved it.
<!--short_desc-->

Below error returned while executing any git command.

```
    '''xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools),   
    missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
    Failed to find the latest git commit date: VersionCheckError: Command exited
    with code 1: git -c log.showSignature=false log -n 1 --pretty=format:%ad
    --date=iso
    Standard out: 
    Standard error: xcrun: error: invalid active developer path
    (/Library/Developer/CommandLineTools), missing xcrun at:
    /Library/Developer/CommandLineTools/usr/bin/xcrun
```

This error is related to Command Line tools path is reset during upgrading. We need to execute XCode commands to set it back.

```
    xcode-select --install
    sudo xcode-select -s /Library/Developer/CommandLineTools/
```

We can also use XCode UI application to set it up.

1. Open XCode
2. Open Preferences (`⌘``,`)
3. Go to Locations tab
4. For “Command Line Tools” select the current version  

<img src="{{site.url}}/assets/image/tech/xcode-version.png" class="img-thumbnail" alt="Long Ly">

Hope this helps and save time for you.

Source: <a href="https://stackoverflow.com/questions/64489433/xcrun-error-invalid-active-developer-path-problem-after-zsh-update-for-flutte" target="_blank">_StackOverflow_</a>