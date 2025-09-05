# Deployment Guide for LinuxConsulting.my

## Option 1: GitHub Pages (Recommended for Free Hosting)

### Steps:
1. Create a new GitHub repository named "linuxconsulting.my"
2. Upload all the files to the repository
3. Go to Repository Settings > Pages
4. Under "Source", select "main" branch and root folder
5. Click "Save" - your site will be live at:
   `https://your-username.github.io/linuxconsulting.my`

### Custom Domain Setup (Optional):
1. In your repository Settings > Pages, add your custom domain
2. Update your DNS settings at Namecheap:
   - Add a CNAME record: www -> your-username.github.io
   - Or A records: @ -> 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153

## Option 2: Netlify (Easy Drag & Drop)

### Steps:
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your website folder
3. Your site will be deployed instantly
4. You can connect your GitHub repo for automatic deployments

## Option 3: Traditional Web Hosting

### Steps:
1. Upload all files to your web server via FTP/SFTP
2. Ensure your domain DNS points to your hosting provider
3. Test the website functionality

## Important Notes:

- For the contact form to work, you'll need to:
  - Use a form service like Formspree, FormSubmit, or Netlify Forms
  - Update the form action in index.html
  - Or implement a backend solution

- For email (info@linuxconsulting.my):
  - Set up email forwarding in your domain registrar
  - Or use Zoho Mail/G Suite for professional email

- SSL Certificate: Most modern hosting providers include SSL automatically
