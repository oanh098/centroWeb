---
title: Contact
templateClass: tmpl-post
eleventyNavigation:
    key: Contact
    order: 400
---
<form name="contact" method="POST" data-netlify="true">
<p>
    <label>Your Name: <input type="text" name="name"></label>
</p>
<p>
    <label>Your Email: <input type="email" name="email"></label>
</p>
<p>
    <label>Your Role: <select name="role[]" multple>
        <option value="leader">Leader</option>
        <option value="follower">Follower</option>
    </select></label>
</p>
<p>
    <label>Message: <textarea name="message" cols="30" rows="10"></textarea></label>
</p>
<p>
    <button type="submit">Send</button>
</p>
</form>