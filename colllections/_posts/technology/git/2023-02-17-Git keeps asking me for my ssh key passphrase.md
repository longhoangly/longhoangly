---
author: Long
layout: post
tags: ["git"]
excerpt_separator: <!--short_desc-->
---

Usually, when we use Git via SSH, we don't need to enter passphrase all the time. But sometime, it keeps asking you to enter the passphrase. Here is how I resolved it.
<!--short_desc-->

Git keep asking you to enter the passphrase because the SSH key was not added to the SSH agent yet.  
Here how we add SSH key into the agent.

1. Make sure your SSH agent already started.  
Try below command, it it asks you to enter the passphrase, means SSH agent already started.

    ```
        # ssh-add
        Error connecting to agent: Connection refused
    ```

    If you see no process related to ssh-agent, you can use below command to start it.

    ```
        # eval "$(ssh-agent -s)"
        Agent pid 73196
    ```

2. To add and save your key permanently on macOS:

    ```
        # ssh-add -K
        Identity added: /Users/longly/.ssh/id_rsa (longly@localhost.local)
    ```

    This will help to store the SSH key into your's MacOS keychain.
    If you see a warning about deprecated flags:

    ```
        WARNING: The -K and -A flags are deprecated and have been replaced
        by the --apple-use-keychain and --apple-load-keychain
        flags, respectively.  To suppress this warning, set the
        environment variable APPLE_SSH_ADD_BEHAVIOR as described in
        the ssh-add(1) manual page.
    ```

    Try the new variant:

    ```
        # ssh-add --apple-use-keychain
        Identity added: /Users/longly/.ssh/id_rsa (longly@localhost.local)
    ```

3. If you are running Ubuntu OS or equivalent, use below command instead.  
It will ask you to enter the passphrase just once.

    ```
        # ssh-add ~/.ssh/id_rsa
        Enter passphrase for /Users/longly/.ssh/id_rsa: 
        Identity added: /Users/longly/.ssh/id_rsa (longly@localhost.local)
    ```

Hope this helps and save time for you.

References: <a href="https://stackoverflow.com/questions/10032461/git-keeps-asking-me-for-my-ssh-key-passphrase" target="_blank">_StackOverflow_</a>