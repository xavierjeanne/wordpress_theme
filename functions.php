<?php

// Include your functions files here
include('inc/enqueues.php');

function theme_set_theme_supports()
{
    global $wp_version;

    add_theme_support('menus');
    add_theme_support('post-thumbnails');

    add_theme_support('automatic-feed-links');

    // let wordpress manage the title
    add_theme_support('title-tag');

    //add_theme_support( 'custom-background', $args );
    //add_theme_support( 'custom-header', $args );
}

add_action('after_setup_theme', 'theme_set_theme_supports');


/**
 * Register WordPress menus
 * cf : http://codex.wordpress.org/Function_Reference/wp_nav_menu
 *
 */
//@TODO : declare your menus here
register_nav_menus(array(
    'main_menu' => __('Main menu')
));


/**
 * Set style.css as style in admin editor
 *
 */
function theme_set_editor_style()
{
    add_editor_style(get_stylesheet_directory_uri() . '/dist/css/theme.css');
}

//add_action( 'admin_init', 'theme_set_editor_style' ); //@TODO : Uncomment if you use it




include_once( get_stylesheet_directory() .'/inc/back-office.php');





