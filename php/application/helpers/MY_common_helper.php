<?php

function numberFormat($number, $decimals = 2)
{
	return number_format($number, $decimals, '.', '');
}