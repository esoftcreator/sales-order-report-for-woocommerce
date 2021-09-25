<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       
 * @since      1.0.0
 *
 * Sales Order Reports for WooCommerce Main Helper
 */

if(!defined('ABSPATH')){
	exit; // Exit if accessed directly
}
if(!class_exists('Esoftcreator_Helper')):
	class Esoftcreator_Helper {
		protected $currency_symbol;
		public function get_val_from_obj($obj, $key, $prefix = null){
			if(isset($obj[$key]) && $obj[$key]){
				return esc_attr($prefix.$obj[$key]);
			}else{
				return esc_attr($prefix."0");
			}
		}

		public function get_woocommerce_currency_symbol(){
			if(!empty($this->user_currency_symbol)){
				return $this->user_currency_symbol;
			}else{
				$code = get_woocommerce_currency();
				return get_woocommerce_currency_symbol($code);
			}
		}
	}
endif; // class_exists