<?php

namespace App\Http\Controllers;

use App\Models\Transfer;
use App\Models\Yolcu;
use App\Models\Arac;
use App\Models\Yolcutipi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            // Kullanıcının oturumunu başlat
            $user = Auth::user();

            $expirationTime = Carbon::now()->addMinutes(1000)->timestamp;
            $token = JWTAuth::fromUser($user, [
                'exp' => $expirationTime,
                'email' => $user->email
            ]);

            // JWT token'ını çereze ekleyerek HTTP yanıtı oluştur
            $response = response()->json(['response' => 200, 'token' => $token, 'message' => 'Giriş işlemi başarılı.']);


            return $response;
        }

        return response()->json(['response' => 400, 'message' => 'Kullanıcı adı veya şifresi yanlış.']);
    }
    public function logout(Request $request)
    {
        Auth::logout();
        return response()->json(['response' => 200, 'message' => 'Çıkış işlemi başarılı.']);
    }
    public function getallYolcu(Request $request)
    {
        $data = Yolcu::with('yolcu_tipi')->orderBy('id', 'desc')->paginate(100);
        return response()->json($data);
    }
    public function getallYolcuTipi(Request $request)
    {
        $data = Yolcutipi::orderBy('id', 'desc')->get();
        return response()->json($data);
    }
    public function getallArac(Request $request)
    {
        $data = Arac::orderBy('id', 'desc')->paginate(100);
        return response()->json($data);
    }
    public function getallTransfer(Request $request)
    {
        $data = Transfer::with('yolcu')->with('arac')->orderBy('id', 'desc')->paginate(100);
        return response()->json($data);
    }
    public function addYolcu(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'isim' => 'required',
            'soyisim' => 'required',
            'telefon' => 'required',
            'yolcu_tipi_id' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['response' => 400, 'message' => $validator->errors()], 400);
        } else {
            $added = Yolcu::Create([
                "isim" => $request->isim,
                "soyisim" => $request->soyisim,
                "telefon" => $request->telefon,
                "yolcu_tipi_id" => $request->yolcu_tipi_id
            ]);
            if ($added) {
                $yolcuID = $added->id;

                return response()->json(['response' => 200, 'message' => 'Yolcu başarıyla kayıt edilmiştir', 'id' => $yolcuID], 200);
            } else {
                return response()->json(['response' => 500, 'message' => 'Sistemsel bir hata tekrar deneyiniz'], 400);

            }
        }
    }
    public function addArac(Request $request)
    {
        $added = Arac::Create([
            "model" => $request->model,
            "surucu_isim" => $request->surucu_isim,
            "surucu_soyisim" => $request->surucu_soyisim,
        ]);
        if ($added) {
            $aracID = $added->id;
            return response()->json(['response' => 200, 'message' => 'Arac başarıyla kayıt edilmiştir', 'id' => $aracID], 200);
        } else {
            return response()->json(['response' => 500, 'message' => 'Sistemsel bir hata tekrar deneyiniz'], 400);
        }
    }
    public function addTransfer(Request $request)
    {
        $added = Transfer::Create([
            "yolcu_id" => $request->yolcu_id,
            "arac_id" => $request->arac_id,
            "sefer_tarihi" => $request->sefer_tarihi,
            "sefer_saati" => $request->sefer_saati,
            "baslangic_noktasi" => $request->baslangic_noktasi,
            "bitis_noktasi" => $request->bitis_noktasi,
        ]);
        if ($added) {
            return response()->json(['response' => 200, 'message' => 'Arac başarıyla kayıt edilmiştir'], 200);
        } else {
            return response()->json(['response' => 500, 'message' => 'Sistemsel bir hata tekrar deneyiniz'], 400);
        }
    }
    public function getYolcu($id)
    {
        $data = Yolcu::where('id', $id)->first();
        return response()->json($data);
    }
    public function getTransfer($id)
    {
        $data = Transfer::with('yolcu')->with('arac')->where('id', $id)->first();
        return response()->json($data);
    }
    public function getArac($id)
    {
        $data = Arac::where('id', $id)->first();
        return response()->json($data);
    }
    public function putYolcu(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|integer',
        ]);
        $yolcu = Yolcu::find($validatedData['id']);
        if (!$yolcu) {
            return response()->json(['message' => 'Yolcu bulunamadı'], 400);
        }
        $updateData = [];
        if ($request->has('yolcu_tipi_id') && $request->input('yolcu_tipi_id') !== null) {
            $updateData['yolcu_tipi_id'] = intval($request->input('yolcu_tipi_id'));
        }
        if ($request->has('isim') && $request->input('isim') !== null) {
            $updateData['isim'] = $request->input('isim');
        }
        if ($request->has('soyisim') && $request->input('soyisim') !== null) {
            $updateData['soyisim'] = $request->input('soyisim');
        }
        if ($request->has('telefon') && $request->input('telefon') !== null) {
            $updateData['telefon'] = $request->input('telefon');
        }
        $update = $yolcu->update($updateData);
        if ($update) {
            return response()->json(['message' => 'Basarili'], 200);
        } else {
            return response()->json(['message' => 'Sistemsel bir hata oluştu.'], 500);
        }
    }
    public function putArac(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|integer',
        ]);
        $arac = Arac::find($validatedData['id']);
        if (!$arac) {
            return response()->json(['message' => 'Arac bulunamadı'], 400);
        }
        $updateData = [];
        if ($request->has('model') && $request->input('model') !== null) {
            $updateData['model'] = $request->input('model');
        }
        if ($request->has('surucu_isim') && $request->input('surucu_isim') !== null) {
            $updateData['surucu_isim'] = $request->input('surucu_isim');
        }
        if ($request->has('surucu_soyisim') && $request->input('surucu_soyisim') !== null) {
            $updateData['surucu_soyisim'] = $request->input('surucu_soyisim');
        }
        $update = $arac->update($updateData);
        if ($update) {
            return response()->json(['message' => 'Basarili'], 200);
        } else {
            return response()->json(['message' => 'Sistemsel bir hata oluştu.'], 500);
        }
    }
    public function putTransfer(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|integer',
        ]);
        $transfer = Transfer::find($validatedData['id']);
        if (!$transfer) {
            return response()->json(['message' => 'Arac bulunamadı'], 400);
        }
        $updateData = [];
        if ($request->has('baslangic_noktasi') && $request->input('baslangic_noktasi') !== null) {
            $updateData['baslangic_noktasi'] = $request->input('baslangic_noktasi');
        }
        if ($request->has('bitis_noktasi') && $request->input('bitis_noktasi') !== null) {
            $updateData['bitis_noktasi'] = $request->input('bitis_noktasi');
        }
        if ($request->has('sefer_saati') && $request->input('sefer_saati') !== null) {
            $updateData['sefer_saati'] = $request->input('sefer_saati');
        }
        if ($request->has('sefer_tarihi') && $request->input('sefer_tarihi') !== null) {
            $updateData['sefer_tarihi'] = $request->input('sefer_tarihi');
        }
        if ($request->has('arac_id') && $request->input('arac_id') !== null) {
            $updateData['arac_id'] = intval($request->input('arac_id'));
        }
        if ($request->has('yolcu_id') && $request->input('yolcu_id') !== null) {
            $updateData['yolcu_id'] = intval($request->input('yolcu_id'));
        }

        $update = $transfer->update($updateData);
        if ($update) {
            return response()->json(['message' => 'Basarili'], 200);
        } else {
            return response()->json(['message' => 'Sistemsel bir hata oluştu.'], 500);
        }
    }

    public function deleteYolcu($id)
    {
        $yolcu = Yolcu::find($id);

        if (!$yolcu) {
            return response()->json(['message' => 'Yolcu bulunamadı'], 400);
        }
        $delete = $yolcu->delete();
        if ($delete) {
            return response()->json(['message' => 'Yolcu silindi'], 200);
        } else {
            return response()->json(['message' => 'Sistemsel hata'], 500);
        }
    }
    public function deleteArac($id)
    {
        $arac = Arac::find($id);

        if (!$arac) {
            return response()->json(['message' => 'Arac bulunamadı'], 400);
        }
        $delete = $arac->delete();
        if ($delete) {
            return response()->json(['message' => 'Arac silindi'], 200);
        } else {
            return response()->json(['message' => 'Sistemsel hata'], 500);
        }
    }
}