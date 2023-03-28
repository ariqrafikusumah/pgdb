const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432,
});

//** GET FOSIL */
const getFosil = (request, response) => {
  // mengambil parameter query page dan limit dari request
  const { page = 1, limit = 1000000 } = request.query;

  // menghitung offset dan menjalankan query dengan pagination
  const offset = (page - 1) * limit;
  pool.query(
    `SELECT * FROM fosil ORDER BY id ASC LIMIT ${limit} OFFSET ${offset}`,
    (error, results) => {
      if (error) {
        throw error;
      }

      // menghitung total data dan jumlah halaman
      pool.query(
        "SELECT COUNT(*) as total FROM fosil",
        (error, countResult) => {
          if (error) {
            throw error;
          }

          const totalData = countResult.rows[0].total;
          const totalPages = Math.ceil(totalData / limit);

          // menyusun metadata dan response data
          const metadata = {
            totalData,
            totalPages,
            currentPage: page,
            perPage: limit,
          };

          response.status(200).json({
            status: 200,
            type: "Fosil",
            message: "Successfully",
            data: results.rows,
            metadata,
          });
        }
      );
    }
  );
};

//** GET BY ID */
const getFosilById = (request, response) => {
  const id = parseInt(request.params.id);
  // mengambil parameter query page dan limit dari request
  const { page = 1, limit = 1000000 } = request.query;

  // menghitung offset dan menjalankan query dengan pagination
  const offset = (page - 1) * limit;
  pool.query(`SELECT * FROM fosil WHERE id = $1 LIMIT ${limit} OFFSET ${offset}`, [id], (error, results) => {
    if (error) {
      throw error;
    }
    const data = results.rows[0];

    pool.query(
      `SELECT COUNT(*) AS total FROM fosil`,
      (countError, countResult) => {
        if (countError) {
          throw countError;
        }

        const totalData = countResult.rows[0].total;
        const totalPages = Math.ceil(totalData / limit);

        // menyusun metadata dan response data
        const metadata = {
          totalData,
          totalPages,
          currentPage: page,
          perPage: limit,
        };

        response.status(200).json({
          status: 200,
          type: "Fosil",
          message: "Successfully",
          data: results.rows,
          metadata,
        });
      }
    );
  });
};

//** POST  */
const postFosil = (request, response) => {
  const {
    no_reg,
    no_invent,
    kode_bmn,
    nup_bmn,
    merk_bmn,
    no_awal,
    satuan,
    kelompok_koleksi,
    jenis_koleksi,
    sub_jenis_koleksi,
    kode_jenis_koleksi,
    ruang_simpan,
    lokasi_simpan,
    kondisi,
    nama_koleksi,
    keterangan,
    umur_geologi,
    nama_formasi,
    lokasi_temuan,
    koordinat,
    pulau,
    peta,
    lembar_peta,
    skala,
    cara_perolehan,
    tahun_perolehan,
    determinator,
    kolektor,
    kepemilikan,
    publikasi,
    operator,
    tanggal_dicatat,
    nilai_perolehan,
    nilai_buku,
    foto,
    foto_2,
    foto_3
  } = request.body;

  pool.query(
    "INSERT INTO Fosil (no_reg,no_invent,kode_bmn,nup_bmn,merk_bmn,no_awal,satuan,kelompok_koleksi,jenis_koleksi,sub_jenis_koleksi,kode_jenis_koleksi,ruang_simpan,lokasi_simpan,kondisi,nama_koleksi,keterangan,umur_geologi,nama_formasi,lokasi_temuan,koordinat,pulau,peta,lembar_peta,skala,cara_perolehan,tahun_perolehan,determinator,kolektor,kepemilikan,publikasi,operator,tanggal_dicatat,nilai_perolehan,nilai_buku,foto,foto_2,foto_3) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37) RETURNING *",
    [
      no_reg,
      no_invent,
      kode_bmn,
      nup_bmn,
      merk_bmn,
      no_awal,
      satuan,
      kelompok_koleksi,
      jenis_koleksi,
      sub_jenis_koleksi,
      kode_jenis_koleksi,
      ruang_simpan,
      lokasi_simpan,
      kondisi,
      nama_koleksi,
      keterangan,
      umur_geologi,
      nama_formasi,
      lokasi_temuan,
      koordinat,
      pulau,
      peta,
      lembar_peta,
      skala,
      cara_perolehan,
      tahun_perolehan,
      determinator,
      kolektor,
      kepemilikan,
      publikasi,
      operator,
      tanggal_dicatat,
      nilai_perolehan,
      nilai_buku,
      foto,
      foto_2,
      foto_3
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      const newFosil = results.rows[0];
      response.status(201).json({
        status: 201,
        type: "fosil",
        message: "Fosil added successfully",
        data: {
          no_reg: newFosil.no_reg,
          no_invent: newFosil.no_invent,
          kode_bmn: newFosil.kode_bmn,
          nup_bmn: newFosil.nup_bmn,
          merk_bmn: newFosil.merk_bmn,
          no_awal: newFosil.no_awal,
          satuan: newFosil.satuan,
          kelompok_koleksi: newFosil.kelompok_koleksi,
          jenis_koleksi: newFosil.jenis_koleksi,
          sub_jenis_koleksi: newFosil.sub_jenis_koleksi,
          kode_jenis_koleksi: newFosil.kode_jenis_koleksi,
          ruang_simpan: newFosil.ruang_simpan,
          lokasi_simpan: newFosil.lokasi_simpan,
          kondisi: newFosil.kondisi,
          nama_koleksi: newFosil.nama_koleksi,
          keterangan: newFosil.keterangan,
          umur_geologi: newFosil.umur_geologi,
          nama_formasi: newFosil.nama_formasi,
          lokasi_temuan: newFosil.lokasi_temuan,
          koordinat: newFosil.koordinat,
          pulau: newFosil.pulau,
          peta: newFosil.peta,
          lembar_peta: newFosil.lembar_peta,
          skala: newFosil.skala,
          cara_perolehan: newFosil.cara_perolehan,
          tahun_perolehan: newFosil.tahun_perolehan,
          determinator: newFosil.determinator,
          kolektor: newFosil.kolektor,
          kepemilikan: newFosil.kepemilikan,
          publikasi: newFosil.publikasi,
          operator: newFosil.operator,
          tanggal_dicatat: newFosil.tanggal_dicatat,
          nilai_perolehan: newFosil.nilai_perolehan,
          nilai_buku: newFosil.nilai_buku,
          foto: newFosil.foto,
          foto_2: newFosil.foto_2,
          foto_3: newFosil.foto_3,
          id: newFosil.id
        },
      });
    }
  );
};

//** PUT, UPDATE */
const putFosil = (request, response) => {
  const id = parseInt(request.params.id);
  const {
    no_reg,
    no_invent,
    kode_bmn,
    nup_bmn,
    merk_bmn,
    no_awal,
    satuan,
    kelompok_koleksi,
    jenis_koleksi,
    sub_jenis_koleksi,
    kode_jenis_koleksi,
    ruang_simpan,
    lokasi_simpan,
    kondisi,
    nama_koleksi,
    keterangan,
    umur_geologi,
    nama_formasi,
    lokasi_temuan,
    koordinat,
    pulau,
    peta,
    lembar_peta,
    skala,
    cara_perolehan,
    tahun_perolehan,
    determinator,
    kolektor,
    kepemilikan,
    publikasi,
    operator,
    tanggal_dicatat,
    nilai_perolehan,
    nilai_buku,
    foto,
    foto_2,
    foto_3,
  } = request.body;

  pool.query(
    "UPDATE Fosil SET no_reg = $1, no_invent = $2, kode_bmn = $3, nup_bmn = $4, merk_bmn = $5, no_awal = $6, satuan = $7, kelompok_koleksi = $8, jenis_koleksi = $9, sub_jenis_koleksi = $10, kode_jenis_koleksi = $11, ruang_simpan = $12, lokasi_simpan = $13, kondisi = $14, nama_koleksi = $15, keterangan = $16, umur_geologi = $17, nama_formasi = $18, lokasi_temuan = $19, koordinat = $20, pulau = $21, peta = $22, lembar_peta = $23, skala = $24, cara_perolehan = $25, tahun_perolehan = $26, determinator = $27, kolektor = $28, kepemilikan = $29, publikasi = $30, operator = $31,tanggal_dicatat = $32,nilai_perolehan = $33,nilai_buku = $34,foto = $35,foto_2 = $36,foto_3 = $37, WHERE id = $38",
    [
      no_reg,
      no_invent,
      kode_bmn,
      nup_bmn,
      merk_bmn,
      no_awal,
      satuan,
      kelompok_koleksi,
      jenis_koleksi,
      sub_jenis_koleksi,
      kode_jenis_koleksi,
      ruang_simpan,
      lokasi_simpan,
      kondisi,
      nama_koleksi,
      keterangan,
      umur_geologi,
      nama_formasi,
      lokasi_temuan,
      koordinat,
      pulau,
      peta,
      lembar_peta,
      skala,
      cara_perolehan,
      tahun_perolehan,
      determinator,
      kolektor,
      kepemilikan,
      publikasi,
      operator,
      tanggal_dicatat,
      nilai_perolehan,
      nilai_buku,
      foto,
      foto_2,
      foto_3,
      id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Fosil modified with ID: ${id}`);
    }
  );
};

const deleteFosil = (request, response) => {
    const id = parseInt(request.params.id)
    // mengambil parameter query page dan limit dari request
    const { page = 1, limit = 10 } = request.query;

    // menghitung offset dan menjalankan query dengan pagination
    const offset = (page - 1) * limit;
    pool.query('DELETE FROM Fosil WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      
      response.status(200).send(`Fosil deleted with ID: ${id}`)
    })
  }

module.exports = {
  getFosil,
  getFosilById,
  postFosil,
  putFosil,
  deleteFosil,
};
