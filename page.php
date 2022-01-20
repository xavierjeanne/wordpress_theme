<?php get_header(); ?>
<div class="content">

    <?php
    if (have_posts()): the_post();
        // Load default block template page
        get_template_part('template-parts/page/content', 'default');

    endif;
    ?>

</div>
<?php get_footer(); ?>
