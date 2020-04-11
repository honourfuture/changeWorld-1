<?php

function numformat($number, $decimals = 2)
{
	return number_format($number, $decimals, '.', '');
}