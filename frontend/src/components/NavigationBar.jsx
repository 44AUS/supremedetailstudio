import React from "react";
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/navbar";
import {Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/react";
import {ChevronDown, Ceramic, House, Tint, Mobile, Detail, Shield, Business, Plus} from "./Icons.jsx";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Container, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    // display: 'flex',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // height: '100%',
  },
}));

export default function NavBar() {
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    business: <Business className="text-warning" fill="currentColor" size={30} />,
    house: <House className="text-success" fill="currentColor" size={30} />,
    tint: <Tint className="text-secondary" fill="currentColor" size={30} />,
    mobile: <Mobile className="text-primary" fill="currentColor" size={30} />,
    detail: <Detail className="text-success" fill="currentColor" size={30} />,
    ceramic: <Ceramic className="text-danger" fill="currentColor" size={30} />,
    shield: <Shield className="text-danger" fill="currentColor" size={30} />,
    plus: <Plus className="text-danger" fill="currentColor" size={30} />,
  };
  
  const { classes } = useStyles();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (

    <Container size="xl">
    
    <Navbar height='85px' classNames={{ wrapper: "!max-w-full" }} isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>

        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />

      <NavbarBrand>
        <NavLink to='/'>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img className="logo" src="images/logo.png" alt='logo' />
      </Link>
        </NavLink>
      </NavbarBrand>
      
      <NavbarMenu style={{ overflowY: 'scroll' }}>

      <NavbarMenuItem key='1'>
            <Link
              color="primary"
              className="w-full"
              style={{  }}
              to="/services/detailing"
              onClick={() => setIsMenuOpen(false)}
              size="lg"
            >
              Auto Detailing
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem key='1'>
            <Link
              color="primary"
              className="w-full"
              to="/services/mobile-detailing"
              onClick={() => setIsMenuOpen(false)}
              size="lg"
            >
              Mobile Detailing
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem key='1'>
            <Link
              color="primary"
              className="w-full"
              to="/services/paint-protection-film"
              onClick={() => setIsMenuOpen(false)}
              size="lg"
            >
              Paint Protection Film
            </Link>
          </NavbarMenuItem>

          {/* <NavbarMenuItem key='1'>
            <Link
              color="primary"
              className="w-full"
              to="/services/fashion-series-ppf"
              onClick={() => setIsMenuOpen(false)}
              size="lg"
            >
              Fashion Series PPF
            </Link>
          </NavbarMenuItem> */}

          <NavbarMenuItem key='1'>
            <Link
              color="primary"
              className="w-full"
              to="/services/ceramic-coatings"
              onClick={() => setIsMenuOpen(false)}
              size="lg"
            >
              Ceramic Coating
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem key='1'>
            <Link
              color="primary"
              className="w-full"
              to="/services/window-tinting"
              onClick={() => setIsMenuOpen(false)}
              size="lg"
            >
              Window Tinting
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem key='1'>
            <Link
              color="primary"
              className="w-full"
              to="/services/light-protection-film"
              onClick={() => setIsMenuOpen(false)}
              size="lg"
            >
              Light Protection Film
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem key='1'>
            <Link
              color="primary"
              className="w-full"
              to="/services/"
              onClick={() => setIsMenuOpen(false)}
              size="lg"
            >
              Windshield Protection Film
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem key='1'>
            <Link
              color="primary"
              className="w-full"
              to="/services/paint-correction"
              onClick={() => setIsMenuOpen(false)}
              size="lg"
            >
              Paint Correction
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem key='1'>
            <Link
              color="primary"
              className="w-full"
              to="/services/headlight-restoration"
              onClick={() => setIsMenuOpen(false)}
              size="lg"
            >
              Headlight Restoration
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem key='1'>
            <Link
              color="primary"
              className="w-full"
              to="/services/additional-services"
              onClick={() => setIsMenuOpen(false)}
              size="lg"
            >
              Additional Services
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem key='1'>
            <Link
              color="primary"
              className="w-full"
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              size="lg"
            >
              About
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem key='1'>
            <Link
              color="primary"
              className="w-full"
              to="/reviews"
              onClick={() => setIsMenuOpen(false)}
              size="lg"
            >
              Reviews
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem key='1'>
            <Link
              color="primary"
              className="w-full"
              to="/contact-us"
              onClick={() => setIsMenuOpen(false)}
              size="lg"
            >
              Contact
            </Link>
          </NavbarMenuItem>
   
      </NavbarMenu>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Dropdown 
        showArrow
        classNames={{
          base: "before:bg-default-200", // change arrow background
          content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-gray to-default-200 dark:from-default-50 dark:to-black",
        }}
        backdrop="blur"
        >
          <NavbarItem >
            <DropdownTrigger>
              <div style={{ cursor: 'pointer', textTransform: 'uppercase', fontFamily: 'SceneProBold', letterSpacing: '2px', fontSize: '13px' }} endContent={icons.chevron}>Services</div>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
          variant="faded"
            aria-label="Supreme Detail Studio Services"
            className="w-[240px] h-[100%]"
            itemClasses={{
              base: "gap-2 ",

            }}
          >
            <DropdownItem
              key="99_uptime"
              // startContent={icons.detail}
              // description="Much more than just your ordinary car wash. Come see what the premium side of detailing can do for your vehicle."
            >
              <Link to='/services/detailing' style={{ padding: '0px', fontFamily:'SceneProBold', textTransform: 'uppercase', color: '#FFF', letterSpacing: '2px', fontSize: '13px' }}>
              Auto Detailing
              </Link>
            </DropdownItem>

            <DropdownItem
              key="supreme_support"
              // startContent={icons.mobile}
              // description="Detailing at your residence in the Louisville, KY area."
            >
              <Link to='/services/mobile-detailing' style={{ padding: '0px', fontFamily:'SceneProBold', textTransform: 'uppercase', color: '#FFF', letterSpacing: '2px', fontSize: '13px' }}>
              Mobile Detailing
              </Link>
            </DropdownItem>

            <DropdownItem
              key="autoscaling"
              // startContent={icons.ceramic}
              // description="Provides durable and long-lasting protection to surfaces from light scratches, UV rays, chemicals, and environmental contaminants."
            >
             
             <Link to='/services/ceramic-coatings' style={{ padding: '0px', fontFamily:'SceneProBold', textTransform: 'uppercase', color: '#FFF', letterSpacing: '2px', fontSize: '13px' }}>
              Ceramic Coating
              </Link>
            </DropdownItem>

            <DropdownItem
              key="99_uptime"
              // startContent={icons.detail}
              // description="Much more than just your ordinary car wash. Come see what the premium side of detailing can do for your vehicle."
            >
              <Link to='/services/aviation-detailing' style={{ padding: '0px', fontFamily:'SceneProBold', textTransform: 'uppercase', color: '#FFF', letterSpacing: '2px', fontSize: '13px' }}>
              Aviation Detailing
              </Link>
            </DropdownItem>

            <DropdownItem
              key="99_uptime"
              // startContent={icons.detail}
              // description="Much more than just your ordinary car wash. Come see what the premium side of detailing can do for your vehicle."
            >
              <Link to='/services/marine-detailing-and-coating' style={{ padding: '0px', fontFamily:'SceneProBold', textTransform: 'uppercase', color: '#FFF', letterSpacing: '2px', fontSize: '13px' }}>
              Marine Detailing
              </Link>
            </DropdownItem>

            <DropdownItem
              key="production_ready"
              // startContent={icons.detail}
              // description="Is your car starting to develop swirls or lacking that original gloss and luster from when you first bought it? Then we have the solution for you."
            >
              <Link to='/services/paint-correction' style={{ padding: '0px', fontFamily:'SceneProBold', textTransform: 'uppercase', color: '#FFF', letterSpacing: '2px', fontSize: '13px' }}>
              Paint Correction
              </Link>
            </DropdownItem>

            <DropdownItem
              key="production_ready"
              // startContent={icons.detail}
              // description="Is your car starting to develop swirls or lacking that original gloss and luster from when you first bought it? Then we have the solution for you."
            >
              <Link to='/services/clear-coat-renewal' style={{ padding: '0px', fontFamily:'SceneProBold', textTransform: 'uppercase', color: '#FFF', letterSpacing: '2px', fontSize: '13px' }}>
              Clear Coat Renewal
              </Link>
            </DropdownItem>

            <DropdownItem
              key="usage_metrics"
              // startContent={icons.shield}
              // description="Protect and preserve the paint of your vehicle against rock chips, road debris and minor scratches with our professionally installed Paint Protection Film."
            >
              <Link to='/services/paint-protection-film' style={{ padding: '0px', fontFamily:'SceneProBold', textTransform: 'uppercase', color: '#FFF', letterSpacing: '2px', fontSize: '13px' }}>
              Paint Protection Film
              </Link>
            </DropdownItem>

            {/* <DropdownItem
              key="usage_metrics"
              // startContent={icons.shield}
              // description="Protect and preserve the paint of your vehicle against rock chips, road debris and minor scratches with our professionally installed Paint Protection Film."
            >
              <Link to='/services/paint-protection-film' style={{ padding: '0px', fontFamily:'SceneProBold', textTransform: 'uppercase', color: '#FFF', letterSpacing: '2px', fontSize: '13px' }}>
              Fashion Series PPF
              </Link>
            </DropdownItem> */}

            <DropdownItem
              key="usage_metrics"
              // startContent={icons.shield}
              // description="Protect and preserve the paint of your vehicle against rock chips, road debris and minor scratches with our professionally installed Paint Protection Film."
            >
              <Link to='/services/light-protection-film' style={{ padding: '0px', fontFamily:'SceneProBold', textTransform: 'uppercase', color: '#FFF', letterSpacing: '2px', fontSize: '13px' }}>
              Light Protection Film
              </Link>
            </DropdownItem>

            <DropdownItem
              key="supreme_support"
              // startContent={icons.tint}
              // description="Protect the interior of your vehicle from harmful UV rays and the Louisville heat."
            >
              <Link to='/services/window-tinting' style={{ padding: '0px', fontFamily:'SceneProBold', textTransform: 'uppercase', color: '#FFF', letterSpacing: '2px', fontSize: '13px' }}>
              Window Tinting
              </Link>
            </DropdownItem>

            <DropdownItem
              key="usage_metrics"
              // startContent={icons.shield}
              // description="Protect and preserve the paint of your vehicle against rock chips, road debris and minor scratches with our professionally installed Paint Protection Film."
            >
              <Link to='/services/windshield-protection-film' style={{ padding: '0px', fontFamily:'SceneProBold', textTransform: 'uppercase', color: '#FFF', letterSpacing: '2px', fontSize: '13px' }}>
              Windshield Protection
              </Link>
            </DropdownItem>
    
            {/* <DropdownItem
              key="supreme_support"
              // startContent={icons.house}
              // description="Protect and enhance your kitchen with our protective film installs."
            >
             <Link to='/residential-services' style={{ padding: '0px', fontFamily:'SceneProBold', textTransform: 'uppercase', color: '#FFF', letterSpacing: '2px', fontSize: '13px' }}>
              Residential Services
              </Link>
            </DropdownItem> */}
            
            <DropdownItem
              key="supreme_support"
              // startContent={icons.plus}
              // description="Customize your detailing experience with the additional services we offer"
            >
              <Link to='/services/headlight-restoration' style={{ padding: '0px', fontFamily:'SceneProBold', textTransform: 'uppercase', color: '#FFF', letterSpacing: '2px', fontSize: '13px' }}>
              Headlight Restoration
              </Link>
            </DropdownItem>

            <DropdownItem
              key="supreme_support"
              // startContent={icons.plus}
              // description="Customize your detailing experience with the additional services we offer"
            >
              <Link to='/services/additional-services' style={{ padding: '0px', fontFamily:'SceneProBold', textTransform: 'uppercase', color: '#FFF', letterSpacing: '2px', fontSize: '13px' }}>
              Additional Services
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* <NavbarItem>
        <NavLink to='/tesla-customers' style={{ textTransform: 'uppercase', fontFamily: 'SceneProBold', letterSpacing: '2px', fontSize: '13px' }}>
            Tesla Customers
          </NavLink>
        </NavbarItem> */}
        
        <NavbarItem>
        <NavLink to='/about' style={{ textTransform: 'uppercase', fontFamily: 'SceneProBold', letterSpacing: '2px', fontSize: '13px' }}>
            About
          </NavLink>
        </NavbarItem>

        <NavbarItem>
        <NavLink to='/reviews' style={{ textTransform: 'uppercase', fontFamily: 'SceneProBold', letterSpacing: '2px', fontSize: '13px' }}>
            Reviews
          </NavLink>
        </NavbarItem>

        <NavbarItem>
        <NavLink to='/blog' style={{ textTransform: 'uppercase', fontFamily: 'SceneProBold', letterSpacing: '2px', fontSize: '13px' }}>
            Blog
          </NavLink>
        </NavbarItem>

        <Dropdown
                showArrow
                classNames={{
                  base: "before:bg-default-200", // change arrow background
                  content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-gray to-default-200 dark:from-default-50 dark:to-black",
                }}
                backdrop="blur"
        >
          <NavbarItem >
            <DropdownTrigger>
              <div style={{ cursor: 'pointer', textTransform: 'uppercase', fontFamily: 'SceneProBold', letterSpacing: '2px', fontSize: '13px' }} endContent={icons.chevron}>More</div>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            variant="faded"
            aria-label="Supreme Detail Studio Services"
            className="w-[240px] h-[100%]"
            itemClasses={{
              base: "gap-2 ",

            }}
          >
            <DropdownItem
              key="usage_metrics"
              // startContent={icons.activity}
            >
              <Link to='/before-and-after' style={{ padding: '0px', fontFamily:'SceneProBold', textTransform: 'uppercase', color: '#FFF', letterSpacing: '2px', fontSize: '13px' }}>
              Before And After
              </Link>
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              // startContent={icons.flash}
            >
              <Link to='/gallery' style={{ padding: '0px', fontFamily:'SceneProBold', textTransform: 'uppercase', color: '#FFF', letterSpacing: '2px', fontSize: '13px' }}>
              Gallery
              </Link>
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
              // startContent={icons.server}
            >
              <Link to='/faq' style={{ padding: '0px', fontFamily:'SceneProBold', textTransform: 'uppercase', color: '#FFF', letterSpacing: '2px', fontSize: '13px' }}>
              FAQs
              </Link>
            </DropdownItem>
           
          </DropdownMenu>
        </Dropdown>

        <NavbarItem>
        <NavLink to='/contact-us' style={{ textTransform: 'uppercase', fontFamily: 'SceneProBold', letterSpacing: '2px', fontSize: '13px' }}>
            Contact
          </NavLink>
        </NavbarItem>
        
      </NavbarContent>

      <NavbarContent justify="end" className="sm:hidden">
        <NavbarItem>
          <Link to='https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw' target="_blank">
          <Button radius="none" size="sm" style={{ backgroundColor: 'rgb(232, 2, 0)', fontFamily: 'SceneProRg', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Book Now
          </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="max-sm:hidden">
        <NavbarItem>
          <Link to='https://app.urable.com/virtual-shop/rB9FHJFIfifYgU8Ty9Yw' target="_blank">
          <Button radius="none" size="md" style={{ backgroundColor: 'rgb(232, 2, 0)', fontFamily: 'SceneProRg', letterSpacing: '3px', textTransform: 'uppercase' }}>
            Book Appointment
          </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>

    </Navbar>
    </Container>
  );
}