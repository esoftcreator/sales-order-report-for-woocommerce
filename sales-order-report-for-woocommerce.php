<?php
/**
 * @link              https://esoftcreator.com
 * @since             1.0.0
 * @package           Sales_Order_Report_For_Woocommerce
 *
 * @wordpress-plugin
 * Plugin Name:       Sales Order Report for WooCommerce
 * Plugin URI:        https://wordpress.org/plugins/sales-order-report-for-woocommerce
 * Description:       Analysis of sales order report with various important metrics, that are present behavior of woocommerce store sales performance with the uses of varis charts and key data.
 * Version:           1.0.0
 * Author:            E-soft Creator
 * Author URI:        https://esoftcreator.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       sales-order-report-for-woocommerce
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 */
define( 'E_SOFT_CREATOR_VERSION', '1.0.0' );
if ( ! defined( 'E_SOFT_CREATOR_PLUGIN_DIR' ) ) {
    define( 'E_SOFT_CREATOR_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
}
if ( ! defined( 'E_SOFT_CREATOR_PLUGIN' ) ) {
    define( 'E_SOFT_CREATOR_PLUGIN', basename(__DIR__) );
}
if ( ! defined( 'E_SOFT_CREATOR_PLUGIN_URL' ) ) {
    define( 'E_SOFT_CREATOR_PLUGIN_URL', plugins_url() . '/'.E_SOFT_CREATOR_PLUGIN );
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-e-soft-creator-activator.php
 */
function activate_Sales_Order_Report_For_Woocommerce() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-e-soft-creator-activator.php';
	Sales_Order_Report_For_Woocommerce_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-e-soft-creator-deactivator.php
 */
function deactivate_Sales_Order_Report_For_Woocommerce() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-e-soft-creator-deactivator.php';
	Sales_Order_Report_For_Woocommerce_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_Sales_Order_Report_For_Woocommerce' );
register_deactivation_hook( __FILE__, 'deactivate_Sales_Order_Report_For_Woocommerce' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-e-soft-creator.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_Sales_Order_Report_For_Woocommerce() {

	$plugin = new Sales_Order_Report_For_Woocommerce();
	$plugin->run();

}
run_Sales_Order_Report_For_Woocommerce();
