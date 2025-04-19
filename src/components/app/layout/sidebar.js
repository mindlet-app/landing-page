document.addEventListener("DOMContentLoaded", () => {
  const myDrawer = document.getElementById("my-drawer");
  const drawerContainer = document.getElementById("drawer-container");
  const sidebarCloseBtn = document.getElementById("sidebar-close-btn");
  const drawerOpenBtn = document.getElementById("drawer-open-btn");
  const desktopSidebarOpenBtn = document.getElementById(
    "desktop-sidebar-open-btn"
  );
  const drawerOverlay = document.getElementById("drawer-overlay");

  // State tracking
  let isDesktopSidebarOpen = true;
  let wasMobileLastResize = window.innerWidth < 1024;

  // Breakpoint detection
  const isMobile = () => window.innerWidth < 1024;
  const isDesktop = () => window.innerWidth >= 1024;

  // Function to open the sidebar
  const openSidebar = () => {
    if (!myDrawer) return;

    myDrawer.checked = false;

    if (isMobile()) {
      drawerContainer?.classList.add("drawer-open");
    } else {
      // Desktop specific
      drawerContainer?.classList.add("lg:drawer-open");
      isDesktopSidebarOpen = true;
      updateDesktopToggleVisibility();
    }
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    if (!myDrawer) return;

    myDrawer.checked = true;

    if (isMobile()) {
      drawerContainer?.classList.remove("drawer-open");
    } else {
      // Desktop specific
      drawerContainer?.classList.remove("lg:drawer-open");
      isDesktopSidebarOpen = false;
      updateDesktopToggleVisibility();
    }
  };

  // Update desktop open button visibility
  const updateDesktopToggleVisibility = () => {
    if (!desktopSidebarOpenBtn) return;

    if (isDesktop() && !isDesktopSidebarOpen) {
      // Show desktop open button only when sidebar is closed on desktop
      desktopSidebarOpenBtn.classList.remove("hidden");
      desktopSidebarOpenBtn.classList.add("flex");
    } else {
      // Hide the button in all other cases
      desktopSidebarOpenBtn.classList.remove("flex");
      desktopSidebarOpenBtn.classList.add("hidden");
    }
  };

  // Handle resize events to properly manage sidebar state
  const handleResize = () => {
    const isCurrentlyMobile = isMobile();

    // Detect transition from mobile to desktop
    if (wasMobileLastResize && !isCurrentlyMobile) {
      // If we're switching from mobile to desktop, always ensure the
      // desktop sidebar button is visible if sidebar is closed
      if (myDrawer && myDrawer.checked) {
        isDesktopSidebarOpen = false;
        drawerContainer?.classList.remove("lg:drawer-open");
        updateDesktopToggleVisibility();
      } else {
        isDesktopSidebarOpen = true;
        drawerContainer?.classList.add("lg:drawer-open");
      }
    } else if (isDesktop()) {
      // Regular desktop handling
      if (isDesktopSidebarOpen) {
        drawerContainer?.classList.add("lg:drawer-open");
      } else {
        drawerContainer?.classList.remove("lg:drawer-open");
      }
    }

    // Update toggle visibility
    updateDesktopToggleVisibility();

    // Store current state for next resize
    wasMobileLastResize = isCurrentlyMobile;
  };

  // Initialize event listeners
  if (
    myDrawer &&
    sidebarCloseBtn &&
    drawerOpenBtn &&
    desktopSidebarOpenBtn &&
    drawerOverlay &&
    drawerContainer
  ) {
    // Close button event
    sidebarCloseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeSidebar();
    });

    // Open button event (mobile only)
    drawerOpenBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openSidebar();
    });

    // Desktop open button event
    desktopSidebarOpenBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openSidebar();
    });

    // Overlay event - handles clicking outside the sidebar to close it
    drawerOverlay.addEventListener("click", () => {
      closeSidebar();
    });

    // Handle window resize events
    window.addEventListener("resize", handleResize);

    // Initial setup
    handleResize();
  }
});
