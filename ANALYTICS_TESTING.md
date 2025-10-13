# Analytics Testing Checklist

## 🧪 **Step-by-Step Testing Guide**

### **Setup**

1. Open http://localhost:5173/ in your browser
2. Open DevTools (F12) → Console tab
3. Look for analytics events as you interact with the site

### **Test Cases**

#### ✅ **1. Page View Tracking (Automatic)**

- **What to test**: Navigate between pages
- **Expected events**: `page_view` events in console
- **Test steps**:
  - Go to Home → Projects → Skills → About → Contact
  - Each navigation should trigger a `page_view` event

#### ✅ **2. CTA Button Clicks**

- **What to test**: Internal navigation buttons
- **Expected events**: `cta_click` and `page_navigation` events
- **Test steps**:
  - Click "View My Projects" button on Home page
  - Click "Get In Touch" button in Footer
  - Click navigation menu items
  - Click "Back to Home" buttons on detail pages

#### ✅ **3. Resume Download Tracking**

- **What to test**: PDF download button
- **Expected events**: `file_download` event
- **Test steps**:
  - Scroll to Footer
  - Click "Download Resume" button
  - Should see download event with file details

#### ✅ **4. External Link Tracking**

- **What to test**: GitHub and LinkedIn links
- **Expected events**: `click` event with external link data
- **Test steps**:
  - Click GitHub icon in navigation
  - Click LinkedIn icon in navigation
  - Should see social media link tracking

#### ✅ **5. Content View Tracking**

- **What to test**: Detail page views
- **Expected events**: `content_view` events
- **Test steps**:
  - Click on any project card → should track project view
  - Click on any skill card → should track skill view
  - Visit case study page → should track case study view

### **Expected Console Output Format**

```javascript
// Page view example
gtag('event', 'page_view', { page_path: '/projects', page_title: '...' })

// CTA click example
gtag('event', 'cta_click', {
  event_category: 'engagement',
  event_label: 'View My Projects',
  custom_parameters: { ... }
})

// Download example
gtag('event', 'file_download', {
  event_category: 'downloads',
  event_label: 'DARDEN_BACKEND_v2.pdf',
  custom_parameters: { file_type: 'PDF', ... }
})

// External link example
gtag('event', 'click', {
  event_category: 'external_links',
  event_label: 'GitHub',
  custom_parameters: { link_type: 'social', ... }
})

// Content view example
gtag('event', 'content_view', {
  event_category: 'content',
  event_label: 'Project Name',
  custom_parameters: { content_type: 'project', ... }
})
```

### **Real GA4 Testing**

After console testing, check your GA4 property:

1. Go to Google Analytics (GA4 property G-RR5WDS9DYH)
2. Navigate to Reports → Real-time
3. Interact with your site
4. Events should appear in real-time within 10-30 seconds

### **Production Build Test**

```bash
npm run build
npm run preview  # Test production build
```

## 🚨 **Troubleshooting**

- **No events in console**: Check if GA4 script loaded in Network tab
- **Events not in GA4**: Verify tracking ID G-RR5WDS9DYH is correct
- **Button clicks not tracking**: Check console for JavaScript errors
- **Page views missing**: Verify router navigation is working

## ✅ **Sign-off Criteria**

- [ ] Page navigation triggers page_view events
- [ ] Button clicks trigger appropriate CTA events
- [ ] Resume download triggers file_download event
- [ ] Social links trigger external link events
- [ ] Project/skill detail views trigger content_view events
- [ ] No JavaScript errors in console
- [ ] Events appear in GA4 real-time reports
