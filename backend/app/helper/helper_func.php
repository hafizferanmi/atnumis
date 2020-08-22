<?php 

function padzero($id){
    $zero = ['0', '00', '000'];
    $a = str_split($id);
    if (count($a) < 4) {
        $less = 4 - count($a);
        $order_id = $zero[$less - 1] . $id;
    }else{
        $order_id = $id;
    }
    return '#' . $order_id;
}

 function format_id($id){
    $zero = ['0', '00', '000'];
    $a = str_split($id);
    if (count($a) < 4) {
        $less = 4 - count($a);
        $coin_id = $zero[$less - 1] . $id;
    }else{
        $coin_id = $id;
    }

    return $coin_id;
}

function setStatusColor($status){
	switch ($status) {
		case 'new':
		case 'processing':
			return 'info';
			break;

		case 'completed':
			return 'success';
			break;

		case 'on-hold':
			return 'secondary';
			break;

		case 'refunded':
			return 'link';
			break;

		case 'failed':
		return 'danger';
			break;

		case 'canceled':
			return 'warning';
			break;

		case 'pending':
			return 'primary';
			break;
		
		default:
			# code...
			break;
	}
}

function setPaidColor($paid){
	switch ($paid) {
		case false:
			return 'danger';
			break;

		case true:
			return 'success';
			break;
		
		default:
			# code...
			break;
	}
}


/**
 * Return the slug of a string to be used in a URL.
 *
 * @return String
 */
function slugify($text){
    // replace non letter or digits by -
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);

    // transliterate
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

    // remove unwanted characters
    $text = preg_replace('~[^-\w]+~', '', $text);

    // trim
    $text = trim($text, '-');

    // remove duplicated - symbols
    $text = preg_replace('~-+~', '-', $text);

    // lowercase
    $text = strtolower($text);

    if (empty($text)) {
      return 'n-a';
    }

    return $text;
}

function returnJson($error, $msg, $data = null){
	return ['error' => $error, 'msg' => $msg,'data' => $data ];
}
